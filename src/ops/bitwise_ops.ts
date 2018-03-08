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

import {doc} from '../doc';
import {ENV} from '../environment';
import {Tensor} from '../tensor';
import * as types from '../types';
import * as util from '../util';
import * as broadcast_util from './broadcast_util';
import {operation} from './operation';

export class BitwiseOps {
  /**
   * Returns the bitwise a AND b element-wise. Supports broadcasting.
   *
   * @param a The first input tensor. Must be of dtype int32.
   * @param b The second input tensor. Must be of dtype int32.
   */
  @doc({heading: 'Operations', subheading: 'Bitwise'})
  @operation
  static bitwiseAnd<T extends Tensor>(a: Tensor, b: Tensor): T {
    util.assert(
        a.dtype === types.DType.int32, 'Tensor should be of type int32');
    util.assertTypesMatch(a, b);
    broadcast_util.assertAndGetBroadcastShape(a.shape, b.shape);
    return ENV.engine.runKernel(backend => backend.bitwiseAnd(a, b), {a, b}) as
        T;
  }
}
