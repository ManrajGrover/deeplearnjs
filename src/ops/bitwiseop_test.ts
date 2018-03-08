/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

// tslint:disable-next-line:max-line-length
import * as dl from '../index';
import {ALL_ENVS, describeWithFlags, expectArraysClose} from '../test_util';
// import * as util from '../util';

// const int32NaN = util.getNaN('int32');

describeWithFlags('bitwiseAnd', ALL_ENVS, () => {
  it('Tensor1D.', () => {
    const a = dl.tensor1d([1, 2, 3], 'int32');
    const b = dl.tensor1d([0, 2, 4], 'int32');
    expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 0]);

    // a = dl.tensor1d([0, 0, 0], 'int32');
    // b = dl.tensor1d([0, 0, 0], 'int32');
    // expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 0]);

    // a = dl.tensor1d([1, 1], 'int32');
    // b = dl.tensor1d([1, 1], 'int32');
    // expectArraysClose(dl.bitwiseAnd(a, b), [1, 1]);
  });
  // it('mismatched Tensor1D shapes', () => {
  //   const a = dl.tensor1d([1, 0], 'int32');
  //   const b = dl.tensor1d([0, 1, 0], 'int32');
  //   const f = () => {
  //     dl.bitwiseAnd(a, b);
  //   };
  //   expect(f).toThrowError();
  // });
  // it('NaNs in Tensor1D', () => {
  //   const a = dl.tensor1d([1, NaN, 0], 'int32');
  //   const b = dl.tensor1d([0, 0, NaN], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, int32NaN, int32NaN]);
  // });

  // it('Tensor2D', () => {
  //   let a = dl.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'int32');
  //   let b = dl.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 0, 0, 0, 0]);

  //   a = dl.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'int32');
  //   b = dl.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 0, 1, 1, 1]);
  // });
  // it('broadcasting Tensor2D shapes', () => {
  //   const a = dl.tensor2d([[1], [0]], [2, 1], 'int32');
  //   const b = dl.tensor2d([[0, 1, 0], [0, 1, 0]], [2, 3], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, 1, 0, 0, 0, 0]);
  // });
  // it('NaNs in Tensor2D', () => {
  //   const a = dl.tensor2d([[1, NaN], [0, NaN]], [2, 2], 'int32');
  //   const b = dl.tensor2d([[0, NaN], [1, NaN]], [2, 2], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, int32NaN, 0, int32NaN]);
  // });

  // it('Tensor3D', () => {
  //   let a = dl.tensor3d([[[1], [0], [1]], [[0], [0], [1]]], [2, 3, 1],
  //   'int32'); let b = dl.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3,
  //   1], 'int32'); expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 1, 0, 0, 0]);

  //   a = dl.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
  //   b = dl.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 0, 1, 1, 1]);
  // });
  // it('broadcasting Tensor3D shapes', () => {
  //   const a = dl.tensor3d(
  //       [[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2],
  //       'int32');
  //   const b =
  //       dl.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'int32');
  //   expectArraysClose(
  //       dl.bitwiseAnd(a, b), [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]);
  // });
  // it('NaNs in Tensor3D', () => {
  //   const a =
  //       dl.tensor3d([[[1], [NaN], [1]], [[0], [0], [0]]], [2, 3, 1],
  //       'int32');
  //   const b =
  //       dl.tensor3d([[[0], [0], [1]], [[1], [0], [NaN]]], [2, 3, 1],
  //       'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, int32NaN, 1, 0, 0, int32NaN]);
  // });

  // it('Tensor4D', () => {
  //   let a = dl.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'int32');
  //   let b = dl.tensor4d([0, 1, 1, 0], [2, 2, 1, 1], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 1, 0]);

  //   a = dl.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'int32');
  //   b = dl.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, 0, 0, 0]);

  //   a = dl.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
  //   b = dl.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [1, 1, 1, 1]);
  // });
  // it('broadcasting Tensor4D shapes', () => {
  //   const a = dl.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'int32');
  //   const b = dl.tensor4d(
  //       [[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [1, 0, 0, 0, 0, 0, 0, 0]);
  // });
  // it('NaNs in Tensor4D', () => {
  //   const a = dl.tensor4d([1, NaN, 1, 0], [2, 2, 1, 1], 'int32');
  //   const b = dl.tensor4d([0, 1, 0, NaN], [2, 2, 1, 1], 'int32');
  //   expectArraysClose(dl.bitwiseAnd(a, b), [0, int32NaN, 0, int32NaN]);
  // });
});
