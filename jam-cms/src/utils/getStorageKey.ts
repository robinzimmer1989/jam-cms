export default function getStorageKey() {
  if (typeof window !== 'undefined') {
    const storageKey = `jam-cms-${window.location.hostname}`;
    return storageKey;
  }

  return false;
}
