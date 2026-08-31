# Digerati pronunciation audio

The homepage dictionary card requires one canonical full-word recording at:

`client/public/audio/digerati-pronunciation.mp3`

The **Hear it** button must use this file. It must not fall back to browser speech synthesis, because the purpose of the card is to give every visitor the same pronunciation regardless of browser, OS, or installed voice.

## Canonical reading

- Display respelling: **dij-uh-RAH-tee**
- Display IPA: `/ˌdɪdʒəˈrɑːti/`
- Primary stress: third syllable (`RAH`)

## Canonical source

The build vendors the US-English human recording published through Wiktionary / Lingua Libre / Wikimedia Commons:

- Commons title: `File:LL-Q1860 (eng)-Flame, not lame-digerati.wav`
- License reported by Commons metadata: **CC0**
- Pinned original WAV SHA-1: `561153b800e1484dd9f5cf1e83f1510db982b1c6`
- Original source format measured in CI: 48,000 Hz, mono, 16-bit PCM
- Measured duration: 1.387 s
- Measured peak: 0.628 full scale
- Measured RMS: -20.2 dBFS
- Measured DC offset: 0.0000
- Measured clipped samples: 0.0000%
- Commons MP3 derivative observed in CI: 24,866 bytes

`scripts/vendor-pronunciation-audio.mjs` refuses to build if the source digest changes, the license is no longer CC0/public domain, the WAV fails its PCM/signal checks, or the MP3 derivative fails the browser-asset checks.

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

The canonical public smoke test enforces presence, audio MIME type, and the size bounds above. Human listening review is still required before release; the automated signal checks establish technical cleanliness, not subjective voice quality.

Per-syllable practice buttons may use browser speech synthesis because they are teaching aids. The full-word **Hear it** control is the authoritative pronunciation and must use the fixed human recording.

## Replacement rule

If a better original DE recording is approved later, replace the source deliberately, update the pinned provenance/digest, and rerun the same signal and browser gates. Do not silently swap the canonical recording and do not copy proprietary dictionary audio into the repository.