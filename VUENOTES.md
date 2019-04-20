| Vue      | Vuex    |
| -------- | ------- |
| data     | state   |
| methods  | actions |
| computed | getters |

Vuex store has Actions, which can help handle updating the State.

And while the instance has computed properties, the Vuex store has Getters, which allow us to access filtered, derived, or computed State.


This project really needs to be refactored for several reasons.

- Components need to be thinner representations. 
- State should be kept in Vuex and the components should really only be reflecting what's in it
- Its probably a better idea to keep all the midiAccess api stuff closer together because we are going to want to be able to quickly update models of inputs and outputs which will require lots of looping through anyway.
- The way WebMidi.js does it is whenever an update to the inputs and outputs happen, it does a full rescan of ports, but doesn't disconnect exisiting ones.
- I think the way to go is to use one large event delegator that all the inputs connect to, rather than trying to make sure each input is ac tually connected to its destination





MIDIMessageEvent {isTrusted: true, data: Uint8Array(3), type: "midimessage", target: MIDIInput, currentTarget: MIDIInput, …}
bubbles: true
cancelBubble: false
cancelable: false
composed: false
currentTarget: MIDIInput {onmidimessage: ƒ, connection: "open", id: "input-0", manufacturer: "", name: "Arturia BeatStep Pro", …}
data: Uint8Array(3) [128, 48, 64]
defaultPrevented: false
eventPhase: 0
isTrusted: true
path: []
returnValue: true
srcElement: MIDIInput {onmidimessage: ƒ, connection: "open", id: "input-0", manufacturer: "", name: "Arturia BeatStep Pro", …}
target: MIDIInput {onmidimessage: ƒ, connection: "open", id: "input-0", manufacturer: "", name: "Arturia BeatStep Pro", …}
timeStamp: 12355.680000007851
type: "midimessage"
__proto__: MIDIMessageEvent
