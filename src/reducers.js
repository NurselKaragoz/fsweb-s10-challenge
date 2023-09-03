import { NOT_EKLE, NOT_SIL } from "./actions";

const NOTLAR_LOACALSTORAGE_KEY = "notlar";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

const localStorageStateYaz = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

const baslangicNotlariniGetir = (key) => {
  const eskiNotlar = localStorageStateOku(key);
  if (eskiNotlar) {
    return eskiNotlar;
  } else {
    return baslangicDegerleri;
  }
};

export const reducer = (
  state = baslangicNotlariniGetir(NOTLAR_LOACALSTORAGE_KEY),
  actions
) => {
  switch (actions.type) {
    case NOT_EKLE:
      const notes = { ...state, notlar: [...state.notlar, actions.payload] };
      localStorageStateYaz(NOTLAR_LOACALSTORAGE_KEY, notes);
      return notes;
    case NOT_SIL:
      const delnotes = {
        ...state,
        notlar: state.notlar.filter((f) => f.id !== actions.payload),
      };
      localStorageStateYaz(NOTLAR_LOACALSTORAGE_KEY, delnotes);
      return delnotes;
    default:
      return state;
  }
};
