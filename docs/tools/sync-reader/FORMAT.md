# Sync Reader text format

Texts are plain-text files (`.txt`) with one sentence per line in each language. Linked words are marked in place with square brackets and a link number. This is the format the in-app prompt asks an AI to produce and the format of the bundled texts in `texts/`. The app converts it to its internal JSON on import, and the old JSON format is still accepted.

## Example

```
title: Одежда на каждый день / Kleidung im Alltag
level: A2
topic: clothes verbs daily life
hintLanguage: ru

== p1
DE: [Am Morgen]1 [öffnet]2 [Anna]3 [den Schrank]4 [und]5 [wählt]6 [Kleidung]7.
RU: [Утром]1 [Анна]3 [открывает]2 [шкаф]4 [и]5 [выбирает]6 [одежду]7.
1 note: am = an dem.
2 form: Инфинитив öffnen: ich öffne, er öffnet, wir öffnen; Präteritum: öffnete; Perfekt: hat geöffnet.
4 form: Der Schrank: мужской род, винительный падеж.

DE: [Zuerst]1 [zieht]2 [sie]3 [ein T-Shirt]4 [an]2, [weil]5 [es]0 [kalt]6 [ist]7.
RU: [Сначала]1 [она]3 [надевает]2 [футболку]4, [потому что]5 [холодно]6,7.
2 sent: Личная форма zieht стоит на позиции 2, приставка an закрывает предложение.
```

## Rules

**Header.** `key: value` lines before the first sentence. Known keys are `id`, `title`, `level`, `topic`, `source`, `hintLanguage` and `folderId`. All are optional. A missing `id` is generated on import.

**Paragraphs.** `== p1` starts a paragraph with id `p1`. Paragraph ids must be unique within a text (duplicates are renamed). If the first sentence comes before any `==` line, a paragraph `p1` is created.

**Sentences.** A `DE:` line and an `RU:` line make one sentence, in either order. A sentence that is missing one of the two lines is skipped with a warning, so a reply that was cut off still imports everything before the cut.

**Links.** `[words]N` marks the words inside the brackets as link `N`. The number follows `]` directly, with no space. Numbers restart at 1 in each sentence.
- The same number on the DE line and the RU line links the two fragments.
- The same number used twice on one line groups the parts. Use this for separated verb prefixes, as in `[ruft]2 sie … [an]2`, or for an article split from its noun by an adjective, as in `[eine]4 [kleine]5 [Nachricht]4`.
- `[холодно]6,7` lets one fragment belong to several links.
- `[es]0` marks a word that has no counterpart in the other language. It counts as covered, but it is not clickable.
- The brackets only mark words. The sentence shown in the reader is the line with the brackets and numbers removed.

**Notes.** `N note: …`, `N form: …` and `N sent: …` go after the sentence they belong to, where `N` is a link number from that sentence.
- `note` is the contextual meaning or synonyms.
- `form` is word grammar: conjugation, gender, case.
- `sent` is sentence construction.
- Each note fits on one line. Repeating a kind for the same link appends to it.

**Tolerated noise.** Code fences (```` ``` ````), list bullets (`- `), `**DE:**`-style bold labels and non-breaking spaces are ignored.

## Validation

Import never fails because of one bad line. Problems are listed with their line numbers:

- an unclosed or stray `[` or `]`
- `[words]` with no link number
- a link that appears on only one side
- a note for a link number that does not exist
- a word on either line that is not inside any link
- a sentence missing its DE or RU line

Import fails only when no complete sentence is found. `node tools/validate-texts.js` runs the same checks on the files in `texts/`.

## Internal JSON

The parser produces the sentence-scoped JSON used in localStorage and in `texts/text-bank.js`:

```
{ id, title, level, topic, source, hintLanguage, p: [ [paragraphId, [ [ruSentence, deSentence, pairs], … ] ], … ] }
```

Each pair is `[DE, RU, note, formTip, sentenceNote]`, and a side is a string or an array of parts. Links are ordered by number. `0` links become pairs with an empty side. When a word occurs more than once in a sentence, the pairs are reordered so that the reader highlights the occurrence that was marked. `tools/convert-to-inline.js` converts JSON texts to the inline format.
