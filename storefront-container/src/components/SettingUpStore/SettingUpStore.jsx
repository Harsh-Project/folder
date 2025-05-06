const useEffect = await import("react").then((module) => module.useEffect);
const { NameSlice, Slice, SlicePage } = await import("./StoreSliceManage").then((module) => module);
const StoreFrontContainer = await import("StoreFrontContainer/StoreFrontContainer").then((module) => module.default);

const SettingUpStore = (props) => {
  useEffect(() => {
    const mfSlice = SlicePage[props?.type];
    for (let i = 0; i < mfSlice?.length; i++) {
      StoreFrontContainer.reducerManager.add(
        NameSlice[mfSlice[i]],
        Slice[mfSlice[i]]
      );
    }
  }, [props?.type]);
  return props?.children;
};

export default SettingUpStore
