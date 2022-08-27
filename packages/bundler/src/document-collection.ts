/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import * as babel from 'babel-types';
import {ASTNode} from 'parse5';
import {ResolvedUrl} from 'prax-analyzer';

export interface BundledBaseDocument<Node> {
  ast: Node;
  content: string;
  files: ResolvedUrl[];
}

export type BundledHtmlDocument = {
  language: 'html'
}&BundledBaseDocument<ASTNode>;
export type BundledJsDocument = {
  language: 'js'
}&BundledBaseDocument<babel.Node>;
export type BundledDocument = BundledHtmlDocument|BundledJsDocument;


/* A collection of documents, keyed by path */
export class DocumentCollection extends Map<ResolvedUrl, BundledDocument> {
  getHtmlDoc(url: ResolvedUrl) {
    const result = this.get(url);
    if (result === undefined) {
      return undefined;
    }
    if (result.language !== 'html') {
      throw new Error(
          `Expected url ${url} to be html but it was ${result.language}`);
    }
    return result;
  }

  getJsDoc(url: ResolvedUrl) {
    const result = this.get(url);
    if (result === undefined) {
      return undefined;
    }
    if (result.language !== 'js') {
      throw new Error(
          `Expected url ${url} to be js but it was ${result.language}`);
    }
    return result;
  }
}
