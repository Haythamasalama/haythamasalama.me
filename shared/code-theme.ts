import type { ThemeRegistrationRaw } from 'shiki';

/**
 * Code highlighting themes built from the brand palette: soft white text,
 * Iris for keywords, Azure for strings and values, quiet greys for the rest.
 * Used by articles (Nuxt Content) and gists (MDC at runtime).
 */
interface Palette {
  text: string;
  muted: string;
  comment: string;
  keyword: string;
  string: string;
  value: string;
  type: string;
  property: string;
  function: string;
}

function createTheme (name: string, type: 'dark' | 'light', c: Palette): ThemeRegistrationRaw {
  return {
    name,
    type,
    settings: [
      { settings: { foreground: c.text, background: type === 'dark' ? '#0F0F11' : '#FAFAFA' } },
      { scope: ['comment', 'punctuation.definition.comment', 'string.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
      {
        scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new', 'keyword.operator.expression', 'keyword.other', 'entity.name.tag', 'support.type.primitive'],
        settings: { foreground: c.keyword }
      },
      {
        scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string', 'string.unquoted', 'markup.inline.raw', 'entity.other.attribute-name', 'source.dotenv string', 'source.env string'],
        settings: { foreground: c.string }
      },
      {
        scope: ['constant.numeric', 'constant.language', 'constant.character', 'constant.other', 'support.constant', 'variable.language', 'keyword.other.unit'],
        settings: { foreground: c.value }
      },
      {
        scope: ['entity.name.type', 'entity.name.class', 'entity.other.inherited-class', 'support.class', 'support.type', 'entity.name.namespace', 'storage.type.class.jsdoc'],
        settings: { foreground: c.type }
      },
      {
        scope: ['support.type.property-name', 'meta.object-literal.key', 'variable.other.property', 'variable.other.object.property', 'entity.name.tag.yaml', 'variable.other.env', 'variable.other.dotenv', 'source.env variable', 'keyword.other.definition.ini'],
        settings: { foreground: c.property }
      },
      {
        scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function', 'variable.function'],
        settings: { foreground: c.function }
      },
      {
        scope: ['punctuation', 'meta.brace', 'keyword.operator', 'punctuation.definition.tag', 'punctuation.separator', 'punctuation.terminator', 'punctuation.definition.variable'],
        settings: { foreground: c.muted }
      },
      { scope: ['markup.heading', 'entity.name.section'], settings: { foreground: c.function, fontStyle: 'bold' } },
      { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
      { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
      { scope: ['markup.underline.link', 'string.other.link'], settings: { foreground: c.keyword } },
      { scope: ['markup.inserted'], settings: { foreground: c.string } },
      { scope: ['markup.deleted'], settings: { foreground: c.keyword } }
    ]
  };
}

export const codeThemeDark = createTheme('haytham-dark', 'dark', {
  text: '#C4C4CC',
  muted: '#85858F',
  comment: '#6B6B74',
  keyword: '#9D9FFE', // Iris 400
  string: '#9EC7FE', // Azure 300
  value: '#70ADFF', // Azure 400
  type: '#D4D7FE', // Iris 200
  property: '#C5DDFE', // Azure 200
  function: '#EDEDEF'
});

export const codeThemeLight = createTheme('haytham-light', 'light', {
  text: '#3F3F46',
  muted: '#71717A',
  comment: '#8B8B94',
  keyword: '#6762D3', // Iris 600
  string: '#2873D1', // Azure 600
  value: '#195CAE', // Azure 700
  type: '#3F3B87', // Iris 800
  property: '#534DAF', // Iris 700
  function: '#0B0B0C'
});
