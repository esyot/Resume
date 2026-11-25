import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const STORAGE_KEY = "portfolio-theme";
const DARK_BG = "#060b14";
const LIGHT_BG = "#f4f5f6";

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const systemPrefersDark = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-color-scheme: light)").matches;

const stored = readStored();
const isDark = ref(stored ? stored === "dark" : systemPrefersDark());

let consumers = 0;
let media = null;

const paintDocument = (dark) => {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.style.colorScheme = dark ? "dark" : "light";
  el.style.backgroundColor = dark ? DARK_BG : LIGHT_BG;
};

const onSystemChange = (e) => {
  if (!readStored()) isDark.value = e.matches;
};

export function useTheme() {
  const themeClass = computed(() =>
    isDark.value ? "pf-theme-dark" : "pf-theme-light",
  );

  // Paint before first render to avoid a light flash in dark mode.
  paintDocument(isDark.value);
  watch(isDark, paintDocument);

  onMounted(() => {
    if (consumers++ === 0 && typeof window !== "undefined") {
      media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener?.("change", onSystemChange);
    }
  });

  onUnmounted(() => {
    if (--consumers === 0) {
      media?.removeEventListener?.("change", onSystemChange);
      media = null;
    }
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    try {
      localStorage.setItem(STORAGE_KEY, isDark.value ? "dark" : "light");
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  };

  return { isDark, themeClass, toggleTheme };
}
