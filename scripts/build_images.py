import json, os, re, urllib.parse, urllib.request
from PIL import Image
UA="TripNestDev/1.0 (educational project; dev@tripnest.local)"
API="https://commons.wikimedia.org/w/api.php"

picks = {
 # destinations
 "dest-accra": "/tmp/cand/accra__2.jpg",
 "dest-cape-coast": "/tmp/cand2/c-capecoast__1.jpg",
 "dest-elmina": "/tmp/cand/elmina__0.jpg",
 "dest-kumasi": "/tmp/cand/kumasi__0.jpg",
 "dest-aburi": "/tmp/cand2/c-aburi__3.jpg",
 "dest-mole": "/tmp/cand/mole__0.jpg",
 "dest-bosumtwi": "/tmp/cand/bosumtwi__1.jpg",
 "dest-busua": "/tmp/cand/busua__0.jpg",
 "dest-ada-foah": "/tmp/cand/ada-foah__2.jpg",
 "dest-wli": "/tmp/cand/wli__0.jpg",
 "dest-nzulezu": "/tmp/cand/nzulezu__1.jpg",
 "dest-paga": "/tmp/cand/paga__0.jpg",
 "dest-axim": "/tmp/cand/axim__0.jpg",
 "dest-akosombo": "/tmp/cand/akosombo__1.jpg",
 "dest-shai-hills": "/tmp/cand/shai-hills__0.jpg",
 "dest-amedzofe": "/tmp/cand/amedzofe__1.jpg",
 "dest-keta": "/tmp/cand/keta__1.jpg",
 # attractions
 "att-cape-coast-castle": "/tmp/cand/cape-coast__1.jpg",
 "att-elmina-castle": "/tmp/cand/elmina__1.jpg",
 "att-kakum": "/tmp/cand/kakum__2.jpg",
 "att-wli-falls": "/tmp/cand/wli__2.jpg",
 "att-aburi-gardens": "/tmp/cand2/c-aburi__2.jpg",
 "att-boti-falls": "/tmp/cand/boti__0.jpg",
 "att-kintampo-falls": "/tmp/cand/kintampo__0.jpg",
 "att-bosumtwi-crater": "/tmp/cand/bosumtwi__2.jpg",
 "att-larabanga": "/tmp/cand/larabanga__0.jpg",
 "att-tongo": "/tmp/cand/tongo__0.jpg",
 "att-tafi-atome": "/tmp/cand/tafi-atome__0.jpg",
 "att-boabeng-fiema": "/tmp/cand/boabeng-fiema__0.jpg",
 "att-paga-pond": "/tmp/cand/paga-pond__1.jpg",
 "att-jamestown": "/tmp/cand/jamestown__0.jpg",
 "att-black-star": "/tmp/cand/independence-sq__0.jpg",
 "att-makola": "/tmp/cand/makola__0.jpg",
 "att-labadi": "/tmp/cand/accra-beach__0.jpg",
 "att-manhyia": "/tmp/cand/manhyia__1.jpg",
 "att-kejetia": "/tmp/cand/kejetia__0.jpg",
 "att-cape-three-points": "/tmp/cand/cape-three-points__0.jpg",
 "att-dodi-island": "/tmp/cand/volta-lake__0.jpg",
 "att-kyabobo": "/tmp/cand/ghana-waterfall__0.jpg",
 "att-shai-hills": "/tmp/cand/shai-hills__1.jpg",
 "att-akosombo-dam": "/tmp/cand/akosombo__2.jpg",
 # editorial / brand
 "editorial-hero": "/tmp/cand2/c-beaches__1.jpg",
 "editorial-coast": "/tmp/cand2/c-beaches__0.jpg",
 "editorial-culture": "/tmp/cand2/c-culture__0.jpg",
 "editorial-food": "/tmp/cand2/c-cuisine__1.jpg",
 "editorial-kente": "/tmp/cand/ghana-market-fabric__1.jpg",
 "editorial-craft": "/tmp/cand/makola__3.jpg",
 "editorial-forest": "/tmp/cand/ghana-waterfall__2.jpg",
 "editorial-volta": "/tmp/cand/volta-ho__1.jpg",
 "editorial-market-woman": "/tmp/cand/kejetia__3.jpg",
 "editorial-lake": "/tmp/cand/volta-lake__1.jpg",
}

man = {}
for d in ("/tmp/cand","/tmp/cand2"):
    p=os.path.join(d,"manifest.json")
    if os.path.exists(p):
        for slug, entry in json.load(open(p)).items():
            for c in entry["candidates"]:
                man[os.path.basename(c["file"])] = c

def meta(title):
    params={"action":"query","format":"json","titles":title,"prop":"imageinfo",
            "iiprop":"url|extmetadata"}
    req=urllib.request.Request(API+"?"+urllib.parse.urlencode(params),headers={"User-Agent":UA})
    with urllib.request.urlopen(req,timeout=40) as r: d=json.load(r)
    pages=d["query"]["pages"]
    for _,p in pages.items():
        ii=(p.get("imageinfo") or [{}])[0]
        md=ii.get("extmetadata") or {}
        def g(k):
            v=(md.get(k) or {}).get("value","")
            return re.sub(r"\s+"," ",re.sub(r"<[^>]+>","",str(v))).strip()
        return {"title":p.get("title"),"artist":g("Artist"),"license":g("LicenseShortName"),
                "licenseUrl":g("LicenseUrl"),"description":g("ImageDescription")[:240],
                "page":"https://commons.wikimedia.org/wiki/"+urllib.parse.quote((p.get("title") or "").replace(" ","_")),
                "original":ii.get("url")}
    return {}

os.makedirs("public/images",exist_ok=True)
credits={}
for slug,path in picks.items():
    if not os.path.exists(path):
        print("MISSING",slug,path); continue
    im=Image.open(path).convert("RGB")
    w,h=im.size
    if w>2000:
        im=im.resize((2000, int(h*2000/w)), Image.LANCZOS)
    out=f"/home/user/tripnest/public/images/{slug}.jpg"
    im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    base=os.path.basename(path)
    m=man.get(base,{})
    info=meta(m.get("title")) if m.get("title") else {}
    credits[slug]={"file":f"/images/{slug}.jpg","width":im.width,"height":im.height,
                   "title":info.get("title") or m.get("title"),
                   "artist":info.get("artist") or m.get("artist"),
                   "license":info.get("license") or m.get("license"),
                   "licenseUrl":info.get("licenseUrl"),
                   "description":info.get("description") or m.get("desc"),
                   "sourcePage":info.get("page") or m.get("page"),
                   "original":info.get("original") or m.get("orig")}
    print(slug, im.size, credits[slug]["license"], "|", (credits[slug]["artist"] or "?")[:40])
json.dump(credits, open("public/image-credits.json","w"), indent=1)
