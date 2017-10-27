import * as ts from "typescript";
import * as fs from "fs";

let fileNames: string[] = process.argv.slice(2);

interface DocEntry {
  id?: number,
  name?: string,
  fileName?: string,
  documentation?: string,
  type?: string,
  constructors?: DocEntry[],
  parameters?: DocEntry[],
  returnType?: string
};

class DocumentationGenerator {
  private id: number = 0;
  private checker: ts.TypeChecker;
  private output: DocEntry[] = [];

  constructor(
    private fileNames: string[],
    private options: ts.CompilerOptions) { }

  /** visit nodes finding exported classes */
  visit = (node: ts.Node): void => {
    // Only consider exported nodes
    if (!this.isNodeExported(node)) {
      return;
    }

    if (ts.isClassDeclaration(node) && node.name) {
      // This is a top level class, get its symbol
      let symbol = this.checker.getSymbolAtLocation(node.name);
      if (symbol) {
        this.output.push(this.serializeClass(symbol));
      }
    }
    else if (ts.isModuleDeclaration(node)) {
      // This is a namespace, visit its children
      ts.forEachChild(node, this.visit);
    }
  }

  /** Serialize a class symbol information */
  serializeClass = (symbol: ts.Symbol): object => {
    let details = this.serializeSymbol(symbol);

    // Get the construct signatures
    let constructorType = this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    details.constructors = constructorType.getConstructSignatures().map(this.serializeSignature);
    return details;
  }

  /** Serialize a signature (call or construct) */
  serializeSignature = (signature: ts.Signature): object => {
    return {
      id: this.id++,
      parameters: signature.parameters.map(this.serializeSymbol),
      returnType: this.checker.typeToString(signature.getReturnType()),
      documentation: this.getDocumentationText(signature)
    };
  }

  /** Serialize a symbol into a json object */
  serializeSymbol = (symbol: ts.Symbol): DocEntry => {
    return {
      id: this.id++,
      name: symbol.getName(),
      documentation: this.getDocumentationText(symbol),
      type: this.checker.typeToString(
        this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
      )
    };
  }

  /** True if this is visible outside this file, false otherwise */
  isNodeExported = (node: ts.Node): boolean => {
    return (
      (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 || 
      (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
  }

  /** Generate documentation for all classes in a set of .ts files */
  generateDocumentation = (): void => {
    // Build a program using the file name
    let program = ts.createProgram(this.fileNames, this.options);

    // Get the checker
    this.checker = program.getTypeChecker();

    // Visit every sourceFile in the program
    for (const sourceFile of program.getSourceFiles()) {
      if (!sourceFile.isDeclarationFile) {
        // Walk the tree to search for classes
        ts.forEachChild(sourceFile, this.visit);
      }
    }

    fs.writeFileSync("docs.json", JSON.stringify(this.output, undefined, 4));
  }

  getDocumentationText = (object: ts.Signature|ts.Symbol): string => {
    return (
      ts.displayPartsToString(object.getDocumentationComment()).replace(/(\r\n|\n|\r)/gm, " ")
    );
  }
}

const docgen = new DocumentationGenerator(fileNames, {
  target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
});

docgen.generateDocumentation();