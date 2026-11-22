import json, time, urllib.parse, urllib.request
UA="TripNestDev/1.0 (educational project; contact: dev@tripnest.local)"
places = [
 ("accra","Accra, Greater Accra, Ghana",5.5560,-0.1969),
 ("cape-coast","Cape Coast, Central, Ghana",5.1315,-1.2795),
 ("elmina","Elmina, Central, Ghana",5.0849,-1.3500),
 ("kumasi","Kumasi, Ashanti, Ghana",6.6885,-1.6244),
 ("aburi","Aburi, Eastern, Ghana",5.8481,-0.1745),
 ("mole-national-park","Mole National Park, Ghana",9.6833,-1.8500),
 ("lake-bosumtwi","Lake Bosumtwi, Ashanti, Ghana",6.5040,-1.4090),
 ("busua","Busua, Western, Ghana",4.8167,-1.9167),
 ("ada-foah","Ada Foah, Greater Accra, Ghana",5.7833,0.6333),
 ("wli","Wli, Volta, Ghana",7.1167,0.5833),
 ("nzulezu","Nzulezo, Western, Ghana",5.0486,-2.4522),
 ("paga","Paga, Upper East, Ghana",10.9833,-0.8000),
 ("axim","Axim, Western, Ghana",4.8667,-2.2333),
 ("akosombo","Akosombo, Eastern, Ghana",6.3000,0.0500),
 ("shai-hills","Shai Hills Resource Reserve, Ghana",5.9167,0.0667),
 ("amedzofe","Amedzofe, Volta, Ghana",6.6833,0.4000),
 ("keta","Keta, Volta, Ghana",5.9167,0.9833),
 ("c-kakum","Kakum National Park, Ghana",5.3500,-1.3833),
 ("c-capecastle","Cape Coast Castle, Ghana",5.1036,-1.2441),
 ("c-elminacastle","Elmina Castle, Ghana",5.0849,-1.3500),
 ("c-boti","Boti Falls, Ghana",6.1833,-0.2167),
 ("c-kintampo","Kintampo Waterfalls, Ghana",8.0500,-1.7333),
 ("c-larabanga","Larabanga Mosque, Ghana",9.2167,-1.8167),
 ("c-tafiatome","Tafi Atome, Volta, Ghana",7.1000,0.4500),
 ("c-boabeng","Boabeng-Fiema Monkey Sanctuary, Ghana",7.7167,-1.7500),
 ("c-tongo","Tongo Hills, Ghana",10.8667,-0.8167),
 ("c-jamestown","Jamestown Lighthouse, Accra, Ghana",5.5333,-0.2111),
 ("c-blackstar","Black Star Gate, Accra, Ghana",5.5456,-0.1922),
 ("c-makola","Makola Market, Accra, Ghana",5.5500,-0.2100),
 ("c-labadi","Labadi Beach, Accra, Ghana",5.5560,-0.1500),
 ("c-manhyia","Manhyia Palace, Kumasi, Ghana",6.7000,-1.6167),
 ("c-kejetia","Kejetia Market, Kumasi, Ghana",6.6950,-1.6180),
 ("c-capethree","Cape Three Points, Ghana",4.7500,-2.0833),
 ("c-shai","Shai Hills, Ghana",5.9167,0.0667),
 ("c-akodam","Akosombo Dam, Ghana",6.3000,0.0500),
 ("c-keta-fort","Fort Prinzenstein, Keta, Ghana",5.9167,0.9833),
 ("c-kyabobo","Kyabobo National Park, Ghana",8.3500,0.5833),
 ("c-dodi","Dodi Island, Ghana",7.4000,0.1000),
 ("c-tafi2","Tafi Atome Monkey Sanctuary, Ghana",7.1000,0.4500),
]
out={}
for slug,q,lat,lng in places:
    url="https://nominatim.openstreetmap.org/search?"+urllib.parse.urlencode({"q":q,"format":"json","limit":1,"countrycodes":"gh"})
    try:
        req=urllib.request.Request(url,headers={"User-Agent":UA})
        with urllib.request.urlopen(req,timeout=30) as r: d=json.load(r)
        if d:
            la,lo=float(d[0]['lat']),float(d[0]['lon'])
            out[slug]={"query":q,"lat":la,"lng":lo,"display":d[0].get('display_name','')[:110],
                       "guess":[lat,lng],"delta":round(max(abs(la-lat),abs(lo-lng)),4),
                       "source":"OpenStreetMap via Nominatim"}
            print(f"{slug:22s} {la:.4f},{lo:.4f}  d={out[slug]['delta']:.3f}  {d[0].get('display_name','')[:70]}")
        else:
            out[slug]={"query":q,"lat":lat,"lng":lng,"display":"no match","guess":[lat,lng],"delta":None,"source":"manual/approximate"}
            print(f"{slug:22s} NO MATCH -> using guess {lat},{lng}")
    except Exception as e:
        out[slug]={"query":q,"lat":lat,"lng":lng,"display":str(e),"guess":[lat,lng],"delta":None,"source":"manual/approximate"}
        print("ERR",slug,e)
    time.sleep(1.2)
json.dump(out,open('/tmp/geo.json','w'),indent=1)
