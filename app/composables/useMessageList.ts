/**
 * Seznamy z překladů (vue-i18n): pole textů (odstavce) a pole objektů (např. odrážky s nadpisem a textem).
 * tm() vrací nevyrenderované zprávy, rt() je převede na text v aktuálním jazyce.
 * Volejte uvnitř computed(), aby se seznam při přepnutí jazyka přepočítal.
 */
export function useMessageList() {
  const { tm, rt } = useI18n()
  type Message = Parameters<typeof rt>[0]

  /** Pole textů, např. odstavce. Neexistující klíč vrátí prázdné pole. */
  function strings(key: string): string[] {
    const value = tm(key) as unknown
    return Array.isArray(value) ? value.map((m) => rt(m as Message)) : []
  }

  /** Pole objektů s textovými položkami `fields`. */
  function records<K extends string>(key: string, fields: readonly K[]): Record<K, string>[] {
    const value = tm(key) as unknown
    if (!Array.isArray(value)) return []
    return value.map((item) => {
      const source = item as Record<K, Message>
      return Object.fromEntries(fields.map((field) => [field, rt(source[field])])) as Record<K, string>
    })
  }

  return { strings, records }
}
