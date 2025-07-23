import { c as createLocalStorage, T as THEME_PREFERENCE, P as PiPProvider, a as ThemeContext, D as Devtools, Q as QueryDevtoolsContext } from "./HASRA6WW-DGSeaMwk.mjs";
import { g as getPreferredColorScheme, c as createMemo, a as createComponent } from "./index-COPScTf6.mjs";
var DevtoolsComponent = (props) => {
  const [localStore, setLocalStore] = createLocalStorage({
    prefix: "TanstackQueryDevtools"
  });
  const colorScheme = getPreferredColorScheme();
  const theme = createMemo(() => {
    const preference = localStore.theme_preference || THEME_PREFERENCE;
    if (preference !== "system") return preference;
    return colorScheme();
  });
  return createComponent(QueryDevtoolsContext.Provider, {
    value: props,
    get children() {
      return createComponent(PiPProvider, {
        localStore,
        setLocalStore,
        get children() {
          return createComponent(ThemeContext.Provider, {
            value: theme,
            get children() {
              return createComponent(Devtools, {
                localStore,
                setLocalStore
              });
            }
          });
        }
      });
    }
  });
};
var DevtoolsComponent_default = DevtoolsComponent;
export {
  DevtoolsComponent_default as default
};
//# sourceMappingURL=I3HPI4QX-DoG9IvCa.mjs.map
