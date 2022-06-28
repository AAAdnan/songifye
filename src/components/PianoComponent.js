import React, { useEffect } from "react";
import SoundfontProvider from './Keyboard/SoundfontProvider';
import DimensionsProvider from './Keyboard/DimensionsProvider'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';



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
            hostname={soundfontHostname}
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

      function ResponsivePiano(props) {
        return (
          <DimensionsProvider>
            {({ containerWidth, containerHeight }) => (
              <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                  <Piano
                    noteRange={noteRange}
                    width={containerWidth}
                    playNote={playNote}
                    stopNote={stopNote}
                    disabled={isLoading}
                    {...props}
                  />
                )}
              />
            )}
          </DimensionsProvider>
        );
      }

  return (
        <div>
          <div className="mt-5">
            <ResponsivePiano />
          </div>
        </div>
      );
}
