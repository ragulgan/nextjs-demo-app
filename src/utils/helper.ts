export const getLocalStorage = (key: string): string | false => {
  if (typeof window !== "undefined" && window.localStorage) {
    const getStorage = localStorage.getItem(key);
    try {
      // Decode the Base64 string and then decode the URI component
      return getStorage
        ? decodeURIComponent(escape(window.atob(getStorage)))
        : false;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};

export const safeJSONParse = (data: string | null | undefined) => {
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("JSON parse error:", error);
    return null;
  }
};

export const unsetLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};