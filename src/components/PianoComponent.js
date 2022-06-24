import React, { useEffect } from "react";
import SoundfontProvider from './Keyboard/SoundfontProvider';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();



export const PianoComponent = () => {

    const keyboardShortcuts = KeyboardShortcuts.create({
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
      });

      const noteRange = {
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('f4'),
      };

      function BasicPiano() {
        return (
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            render={({ isLoading, playNote, stopNote }) => (
              <Piano
                noteRange={noteRange}
                width={300}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        );
      }

  return (
        <div>
          <div className="mt-5">
            <p>Basic piano with hardcoded width</p>
            <BasicPiano />
          </div>
        </div>
      );
}
