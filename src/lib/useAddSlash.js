const useAddSlash = () => {
  const addSlash = (value) => {
    value = value.replace(/\//g, "");
    const regex = /(\d{1,4})(\d{1,2})?(\d{1,2})?/;
    const groups = value.match(regex);

    if (groups) {
      value = groups
        .slice(1)
        .filter((group) => !!group)
        .join("/");
    }
    return value;
  };

  return addSlash;
};

export default useAddSlash;
