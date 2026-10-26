<script setup lang="ts">
// Čárové ikony z grafického návrhu domovské stránky. Kresby vycházejí z Lucide (licence ISC).
// Dekorativní – význam vždy nese text vedle ikony.
export type IconName = 'growth' | 'people' | 'gear' | 'globe' | 'bars'

defineProps<{ name: IconName }>()
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'growth'">
      <path d="M3 21h18" />
      <rect x="5" y="15" width="3" height="6" rx=".5" />
      <rect x="10.5" y="12.5" width="3" height="8.5" rx=".5" />
      <rect x="16" y="10" width="3" height="11" rx=".5" />
      <path d="m4 11 5-4.5 3 2 7-6" />
      <path d="M15 2.5h4v4" />
    </template>
    <template v-else-if="name === 'people'">
      <circle cx="12" cy="7" r="3" />
      <path d="M6.5 20v-1.5a5.5 5.5 0 0 1 11 0V20" />
      <circle cx="5" cy="9" r="2.2" />
      <path d="M1.5 19v-.8A3.6 3.6 0 0 1 6 14.6" />
      <circle cx="19" cy="9" r="2.2" />
      <path d="M22.5 19v-.8a3.6 3.6 0 0 0-4.5-3.6" />
    </template>
    <template v-else-if="name === 'gear'">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </template>
    <template v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
      <path d="M3.5 7h17M3.5 17h17" />
    </template>
    <template v-else>
      <path d="M3 21h18" />
      <rect x="5" y="13" width="3.5" height="8" rx=".5" />
      <rect x="10.25" y="8" width="3.5" height="13" rx=".5" />
      <rect x="15.5" y="3" width="3.5" height="18" rx=".5" />
    </template>
  </svg>
</template>
