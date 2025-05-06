const localStorageVar = 'flits';

export const GetLocalStorage = (k) => {
    var existing = JSON.parse(localStorage.getItem(localStorageVar));
    var _key = k.split('.');
    var _val = existing;
    if (_key.length > 1) {
      for (let i = 0; i < _key.length; i++) {
        if (_val != null) {
          _val = _val[_key[i]]
        }
      }
    } else {
      if (_val != null) {
        _val = _val[_key[0]]
      }
    }
    return _val;
};

export const SetLocalStorage = (k, v) => {
    if (localStorage.getItem(localStorageVar) == null) {
        localStorage.setItem(localStorageVar, '{}');
        let existing = JSON.parse(localStorage.getItem(localStorageVar));
        existing[k] = v;
        return localStorage.setItem(localStorageVar, JSON.stringify(existing))
      } else {
        let existing = JSON.parse(localStorage.getItem(localStorageVar));
        existing[k] = v;
        return localStorage.setItem(localStorageVar, JSON.stringify(existing))
      }
};

export const RemoveLocalStorage = (key) => {
  if (localStorage.getItem(localStorageVar) != null) {
      var existing = JSON.parse(localStorage.getItem(localStorageVar));
      if (typeof existing[key] !== 'undefined') {
          delete existing[key];
      }
      return localStorage.setItem(localStorageVar, JSON.stringify(existing))
  }
}

export const RemoveMainLocalStorage = () => {
  localStorage.removeItem(localStorageVar);
}