export interface Product {
  id: number;
  name: string;
  price: number;
  category: "hoodies" | "tees";
  image: string;
  badge: "hot" | "new" | "";
}

export const products: Product[] = [
  { id: 1, name: "QUEEN NEFERTITI HOODIE", price: 850, category: "hoodies", image: "https://i.postimg.cc/Y0QxV6g3/516715712-17866882896411646-829132566278910828-n.jpg", badge: "hot" },
  { id: 2, name: "KHABY LAME HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/zXB9x1w5/472608428-17843821857411646-5190413624021546847-n.jpg", badge: "" },
  { id: 3, name: "LEBRON JAMES HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/SKqdt60g/472633368-17843821560411646-1301946515224713514-n.jpg", badge: "" },
  { id: 4, name: "DWAYNE JOHNSON HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/zGmYvcWH/472640130-17843821824411646-6190914740358970487-n.jpg", badge: "" },
  { id: 5, name: "JUDE BELLINGHAM HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/ydXfJtXr/470948200-17843821491411646-2530782776797434651-n.jpg", badge: "hot" },
  { id: 6, name: "SOCIAL MEDIA HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/kGWtXPxZ/472698557-17843821893411646-1529126455755902565-n.jpg", badge: "" },
  { id: 7, name: "EGYPTIAN RULERS HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/4NFDZGb6/472626436-17843821371411646-4896956000507693153-n.jpg", badge: "" },
  { id: 8, name: "KING TUTANKAMUN HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/YqgPcF95/472989124-17843821437411646-5990367707247327182-n.jpg", badge: "" },
  { id: 9, name: "EGYPTIAN CULTURE HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/pLSSzx93/606046002-17886492576411646-3278374060857878734-n.jpg", badge: "" },
  { id: 10, name: "FIFA WORLD CUP HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/qRHPBMmP/unnamed.png", badge: "hot" },
  { id: 11, name: "FLAG TRIO HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/W3s0LzFr/IMG-5148.png", badge: "" },
  { id: 12, name: "CROWNED SKULL HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/fb9PwtrW/Chat-GPT-Image-Feb-13-2026-11-48-51-AM.png", badge: "" },
  { id: 13, name: "ALGERIAN CULTURE HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/3rZnLTjD/IMG-5187.png", badge: "" },
  { id: 14, name: "GOLDEN PHARAOH FADE HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/fyF7D8px/7737277e-2dcb-4dcb-8d0c-cc5297dda1b4.png", badge: "" },
  { id: 15, name: "TUNISIA CULTURE HOODIE", price: 800, category: "hoodies", image: "https://i.postimg.cc/cCZv3NHh/IMG-5259.jpg", badge: "" },
  { id: 16, name: "TRAVIS SCOTT TEE", price: 700, category: "tees", image: "https://i.postimg.cc/fLfbgyd3/491433724-17856683178411646-4354845891759366564-n.jpg", badge: "hot" },
];

export const currencies = [
  { code: "EGP", rate: 1 },
  { code: "USD", rate: 0.032 },
  { code: "EUR", rate: 0.029 },
  { code: "GBP", rate: 0.025 },
  { code: "SAR", rate: 0.12 },
  { code: "AED", rate: 0.12 },
  { code: "KWD", rate: 0.0097 },
  { code: "TRY", rate: 0.93 },
];
