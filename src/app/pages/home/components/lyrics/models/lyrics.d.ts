export interface LyricsTTMLJSON {
  _declaration: Declaration;
  tt: Tt;
}

declare interface Declaration {
  _attributes: DeclarationAttributes;
}

declare interface DeclarationAttributes {
  version: string;
  encoding: string;
}

declare interface Tt {
  _attributes: { [key: string]: string };
  head: Head;
  body: Body;
}

declare interface Body {
  _attributes: BodyAttributes;
  div: Div[];
}

declare interface BodyAttributes {
  dur: string;
  'ttm:agent': TtmAgentEnum;
}

declare enum TtmAgentEnum {
  V1 = 'v1',
  V1000 = 'v1000',
  V2 = 'v2',
}

declare interface Div {
  _attributes: DivAttributes;
  p: P[];
}

declare interface DivAttributes {
  begin: string;
  end: string;
  'itunes:songPart'?: string;
  'ttm:agent'?: TtmAgentEnum;
  'itunes:key'?: string;
}

declare interface P {
  _attributes: DivAttributes;
  span: PurpleSpan[] | FluffySpan;
}

declare interface PurpleSpan {
  _attributes: PurpleAttributes;
  _text?: string;
  span?: FluffySpan[] | FluffySpan;
}

declare interface PurpleAttributes {
  begin?: string;
  end?: string;
  'ttm:role'?: TtmRole;
}

declare enum TtmRole {
  XBg = 'x-bg',
}

declare interface FluffySpan {
  _attributes: FluffyAttributes;
  _text: string;
}

declare interface FluffyAttributes {
  begin: string;
  end: string;
}

declare interface Head {
  metadata: Metadata;
}

declare interface Metadata {
  'ttm:agent': TtmAgent[];
  iTunesMetadata: ITunesMetadata;
}

declare interface ITunesMetadata {
  _attributes: ITunesMetadataAttributes;
  songwriters: Songwriters;
}

declare interface ITunesMetadataAttributes {
  xmlns: string;
  leadingSilence: string;
}

declare interface Songwriters {
  songwriter: Songwriter[];
}

declare interface Songwriter {
  _text: string;
}

declare interface TtmAgent {
  _attributes: TtmAgentAttributes;
}

declare interface TtmAgentAttributes {
  type: string;
  'xml:id': TtmAgentEnum;
}
