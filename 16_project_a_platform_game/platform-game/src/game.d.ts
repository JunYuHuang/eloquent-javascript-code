declare type Status = "playing" | "won" | "lost";
declare type ActorString = "lava" | "wall" | "player" | "coin";
declare type CharToValue = { [char: string]: string | any };
declare type KeysObj = { [keyStr: string]: boolean };
declare type AttributesObj = { [attrStr: string]: string }
declare type FrameFunction = (time: number) => boolean;