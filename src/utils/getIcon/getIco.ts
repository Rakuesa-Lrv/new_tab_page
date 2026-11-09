

type Option<T> = 
| { some: T }
| null;

const PRIVATE_HOST_RE =
  /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[::1\]|\[f[cd])/i;



const getIconURL = (url: string): Option<string> => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if((()=> {const ptc = parsed.protocol; return ptc!=='http:' && ptc!=='https:'})()) return null;

  const hostname = parsed.hostname;

  if(hostname==='') return null;
  if(PRIVATE_HOST_RE.test(hostname)) return null;

  return { some: new URL(hostname, 'https://a.favicon.im/').href };
}

export default getIconURL;