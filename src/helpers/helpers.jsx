export const stringPort = (ports: Array = []) => {
  return ports.map(port => {
    return `${port.PublishedPort}->${port.Protocol}/${port.TargetPort}`
  }).join(', ');
}

export const stringLabel = (label: Object = {}) => {
  return Object.keys(label)
    .map(key => `${key}:${label[key]}`);

}

export const stringArgs = (args: Array = []) => {
  return args.join(' ');
}

/**
 * [
 *   {
 *     PrivatePort:9000
 *     Type:"tcp"
 *   }
 * ]
 *
 */
export const stringContainerPorts = (ports: Array = []) => {
  return ports.map(port => {
    const pubPort = port.PublicPort ? `${port.IP}:${port.PublicPort}->` : '';
    const subPort = port.PrivatePort ? `${port.PrivatePort}/${port.Type}` : '';

    return `${pubPort}${subPort}`;
  }).join(', ')
}
