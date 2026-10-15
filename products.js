const products = [
    { id: 1, name: "Basic H Core — Sage Green", price: 900, rating: 5.0, reviews: 116, category: "basic", badge: "", images: [
        "https://i.postimg.cc/vHRV5KyX/12baf63e-812b-4e3f-aee4-2069def34c1e.png",
        "https://i.postimg.cc/GhksKjhJ/d9232002-5f59-4938-ab4b-dd9c61e16dce.png"
    ]},
    { id: 2, name: "Basic H Core — Brown", price: 900, rating: 4.6, reviews: 118, category: "basic", badge: "", images: [
        "https://i.postimg.cc/9F37ykVz/141078d7-5ed4-4fc5-ad04-d19fb17c614b.png",
        "https://i.postimg.cc/65dGch5G/be9c9281-2516-4135-838a-ba299e914cbb.png"
    ]},
    { id: 3, name: "Basic H Core — Tand", price: 900, rating: 5.0, reviews: 116, category: "basic", badge: "", images: [
        "https://i.postimg.cc/zXmgTQN2/22bce723-3a8b-435d-9942-c93c1b5b872a.png",
        "https://i.postimg.cc/TYrW0cYn/Capture.png"
    ]},
    { id: 4, name: "radyo 3ala el ba7r Hoodie", price: 950, rating: 4.8, reviews: 110, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/WbRk0yj1/36780b8f-a409-429b-bd8e-81fbe038f1df.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 5, name: "Basic H Core — Parchment", price: 900, rating: 5.0, reviews: 116, category: "basic", badge: "", images: [
        "https://i.postimg.cc/3r0G4TsP/3e5e4e98-97a6-402d-bf36-e7ba3d59dd35.png",
        "https://i.postimg.cc/sDFh5LzL/64e2594b-285b-473b-840d-d11d8dbdcd36.png"
    ]},
    { id: 6, name: "Rewayet El 3omr Hoodie", price: 950, rating: 4.9, reviews: 140, category: "graphic", badge: "new", images: [
        "https://i.postimg.cc/TY8DnsG2/4551de3d-1a9a-4c23-a899-95defb9539b1.png",
        "https://i.postimg.cc/CLjf74L1/aeb4b7f9-50ce-46d5-b30b-ffd982fe51a9.png"
    ]},
    { id: 7, name: "Basic H Core — Pink", price: 900, rating: 4.6, reviews: 88, category: "basic", badge: "", images: [
        "https://i.postimg.cc/wTKmDrzG/56a9ad77-941c-41a6-9361-25296a81b73c.png",
        "https://i.postimg.cc/G3TD8CWW/4edb013c-ed27-4a22-a7da-a46417c4f722.png"
    ]},
    { id: 8, name: "Basic H Core — Grey", price: 900, rating: 4.4, reviews: 88, category: "basic", badge: "", images: [
        "https://i.postimg.cc/xTrzLZQF/51e9c1e6-18b7-4755-a37a-2471a3f0ce3a.png",
        "https://i.postimg.cc/5NwFgmNg/koozee-7k4ttkazyk7h7rrz.png"
    ]},
    { id: 9, name: "2ahaan el 2asab", price: 950, rating: 4.6, reviews: 89, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/MZfBMSCg/5f31dc59-e556-41b8-9ab5-fcd5e808780b.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 10, name: "Malekt 3omry Hoodie", price: 950, rating: 4.2, reviews: 32, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/TY8DnsGf/72aacaa5-fb81-4787-89de-a68acc106d15.png",
        "https://i.postimg.cc/Dyqb6cys/c8018f7d-4427-417d-8d05-f478eb566d4d.png"
    ]},
    { id: 11, name: "3esh w mal7 Hoodie", price: 950, rating: 5.0, reviews: 456, category: "graphic", badge: "bestseller", images: [
        "https://i.postimg.cc/PrGw17hP/734776c1-8372-452f-bbd2-a85dba8921a3-cleanup.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 12, name: "Forn balady Hoodie", price: 950, rating: 4.7, reviews: 155, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/sDFh5LyD/81ae3d24-1147-4ab8-8d39-76c303fbe7a1.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 13, name: "8azl banat Hoodie", price: 950, rating: 4.9, reviews: 256, category: "graphic", badge: "new", images: [
        "https://i.postimg.cc/jC0pqbGM/Untitled-design-(7).jpg",
        "https://i.postimg.cc/02pJnC2x/8878018f-3dce-4b58-a7b5-2cdfb6f9d304.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 14, name: "safynet el bo7era Hoodie", price: 950, rating: 4.9, reviews: 456, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/yYFSjTYs/a7bbc4c1-53e7-49ee-9600-c05863eab62d.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 15, name: "masr om el donya Hoodie", price: 950, rating: 4.5, reviews: 78, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/dt8T69tt/ac70b116-a99e-499e-8f04-4b6a7b731b90.png",
        "https://i.postimg.cc/Dyqb6cys/c8018f7d-4427-417d-8d05-f478eb566d4d.png"
    ]},
    { id: 16, name: "sou2 el 8alaaba Hoodie", price: 950, rating: 4.6, reviews: 65, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/65dGch5y/b16c4593-0428-4b9b-970b-6a1517b51a6b.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 17, name: "7aflet share3 Hoodie", price: 980, rating: 5.0, reviews: 312, category: "graphic", badge: "bestseller", images: [
        "https://i.postimg.cc/tChVkzCn/b24f365d-e347-4037-9d29-28c876367891.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 18, name: "yomak 3asal Hoodie", price: 950, rating: 4.7, reviews: 416, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/MX2CZShs/Untitled-design-(6).jpg",
        "https://i.postimg.cc/65dGch57/b351fe37-0ffb-4cf7-b62b-02bdae7a1fde.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 19, name: "2awraka wa2fa Hoodie", price: 950, rating: 4.9, reviews: 201, category: "graphic", badge: "new", images: [
        "https://i.postimg.cc/kXxtsyXQ/d3490dcb-3ee5-4eb7-bcbd-2954dc14e634.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 20, name: "Basic H Core — Black", price: 900, rating: 4.0, reviews: 88, category: "basic", badge: "", images: [
        "https://i.postimg.cc/c4Q8hc4m/f5753ec9-1d18-4ae1-a9e7-e1b48be5e079.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 21, name: "5amarty baladi Hoodie", price: 950, rating: 4.8, reviews: 124, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/mgB15FtC/koozee-udy0kzo66cpjc7ki.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 22, name: "2ahwa masreya Hoodie", price: 950, rating: 4.3, reviews: 45, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/nhp9PQC4/koozee-uwudodya8xy6ip8r.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 23, name: "2aa5r malek Hoodie", price: 950, rating: 4.4, reviews: 29, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/dVwZxTLR/mawlah65731.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]},
    { id: 24, name: "el sfyncs Hoodie", price: 950, rating: 4.3, reviews: 30, category: "graphic", badge: "", images: [
        "https://i.postimg.cc/76XsRG3f/098736d5-5247-42e3-b42d-7711db20f58e.png",
        "https://i.postimg.cc/wTKmDrHY/70b52cc0-abeb-4ee7-9100-0369e4ad755f.png"
    ]}
];

function getStars(rating) {
    let r = Math.round(rating);
    return '★'.repeat(r) + '☆'.repeat(5 - r);
}
