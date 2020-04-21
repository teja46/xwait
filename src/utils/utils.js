export const setCookie = value => {
  console.log(value);
  document.cookie =
    "xwaitUsr=" + value + "; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";
};

export const getCookie = cname => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const destroyCookie = cookieName => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const filterResults = (data, searchStr) => {
  const filteredData = data.filter(item => {
    if (
      item.name.toLocaleLowerCase().indexOf(searchStr.toLocaleLowerCase()) !==
      -1
    ) {
      return true;
    }
    if (
      item.storeAddress
        .toLocaleLowerCase()
        .indexOf(searchStr.toLocaleLowerCase()) !== -1
    ) {
      return true;
    }
    return false;
  });
  return filteredData;
};

export const sortSlotDetails = slotArr => {
  const arr = slotArr.sort(function(a, b) {
    console.log(a);
    a = new Date(a.data.createdAt);
    b = new Date(b.data.createdAt);
    return a < b ? -1 : a > b ? 1 : 0;
  });
  return arr;
};
