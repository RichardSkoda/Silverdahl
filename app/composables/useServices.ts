import { serviceDefs, type ServiceDef } from '~/data/services'

export interface Service extends ServiceDef {
  subtitle: string
  /** Kratší podtitul pro kartu na domovské stránce. */
  tagline: string
  /** Krátký popis pro přehled na domovské stránce. */
  summary: string
  intro: string[]
  items: { title: string; text: string }[]
  areas?: { title: string; text: string; note: string }
  /** Zkrácený výčet oblastí pro přehled na stránce Služby. */
  areasShort?: string
  benefit: string[]
  /** Zkrácené „Co tím získáte?“ pro přehled na stránce Služby. */
  benefitShort: string
}

/** Služby s texty v aktuálním jazyce. */
export function useServices() {
  const { t } = useI18n()
  const { strings, records } = useMessageList()

  return computed<Service[]>(() =>
    serviceDefs.map((def) => {
      const k = `services.list.${def.key}`
      return {
        ...def,
        subtitle: t(`${k}.subtitle`),
        tagline: t(`${k}.tagline`),
        summary: t(`${k}.summary`),
        intro: strings(`${k}.intro`),
        items: records(`${k}.items`, ['title', 'text'] as const),
        areas: def.hasAreas
          ? { title: t(`${k}.areas.title`), text: t(`${k}.areas.text`), note: t(`${k}.areas.note`) }
          : undefined,
        areasShort: def.hasAreas ? t(`${k}.areasShort`) : undefined,
        benefit: strings(`${k}.benefit`),
        benefitShort: t(`${k}.benefitShort`),
      }
    }),
  )
}
