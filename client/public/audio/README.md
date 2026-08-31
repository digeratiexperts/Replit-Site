# Digerati pronunciation audio

The homepage dictionary card requires one canonical full-word recording at:

`client/public/audio/digerati-pronunciation.mp3`

The **Hear it** button must use this file. It must not fall back to browser speech synthesis, because the purpose of the card is to give every visitor the same pronunciation regardless of browser, OS, or installed voice.

## Canonical reading

- Display respelling: **dij-uh-RAH-tee**
- Display IPA: `/ˌdɪdʒəˈrɑːti/`
- Primary stress: third syllable (`RAH`)

## Production acceptance

Use a clean human recording with:

- the word only; no intro/outro, music, bed, reverb, or sound effect;
- neutral, confident US-English delivery;
- correct third-syllable stress;
- no audible clipping, plosives, room echo, hum, hiss, or abrupt edit;
- sensible leading/trailing silence so playback feels immediate but not chopped;
- conservative normalization with headroom (do not brick-wall it);
- mono or stereo MP3 suitable for browser playback;
- file size between 12 KB and 2 MB.

The canonical public smoke test enforces presence, audio MIME type, and the size bounds above. Human listening review is still required before release.

Per-syllable practice buttons may use browser speech synthesis because they are teaching aids. The full-word **Hear it** control is the authoritative pronunciation and must use the fixed recording.

## Source / provenance

Record provenance and license here when the final asset is chosen. Prefer an original DE recording or a redistributable public-domain/CC0 human pronunciation. Do not copy proprietary dictionary audio into the repository.

A US-English Wiktionary/Lingua Libre recording for `digerati` has been identified as a possible fallback source, but it must be auditioned and its exact Commons file/license verified before adoption.