export interface Light {
  on: boolean;
}

export function toggle(light: Light): Light {
  return { on: !light.on };
}
