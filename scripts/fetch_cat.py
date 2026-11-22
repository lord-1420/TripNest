import json, os, sys, urllib.parse, urllib.request
UA = "TripNestDev/1.0 (educational project; contact: dev@tripnest.local)"
API = "https://commons.wikimedia.org/w/api.php"
def api(params):
    params=dict(params); params['format']='json'
    req=urllib.request.Request(API+'?'+urllib.parse.urlencode(params), headers={'User-Agent':UA})
    with urllib.request.urlopen(req, timeout=40) as r: return json.load(r)
cur=None
items=json.load(open(sys.argv[1])); outdir=sys.argv[2]; os.makedirs(outdir,exist_ok=True)
man=json.load(open(os.path.join(outdir,'manifest.json'))) if os.path.exists(os.path.join(outdir,'manifest.json')) else {}
for slug,cat in items.items():
    try:
        d=api({'action':'query','generator':'categorymembers','gcmtitle':cat,'gcmtype':'file','gcmlimit':14,
               'prop':'imageinfo','iiprop':'url|size','iiurlwidth':2000})
        pages=list(((d.get('query') or {}).get('pages') or {}).values())
        pages=[p for p in pages if (p.get('imageinfo') or [{}])[0].get('thumburl')]
        pages.sort(key=lambda p: -(p['imageinfo'][0].get('width',0)))
        kept=[]
        for i,p in enumerate(pages[:4]):
            ii=p['imageinfo'][0]
            if ii.get('width',0)<1200: continue
            fn=f"{slug}__{i}.jpg"
            req=urllib.request.Request(ii['thumburl'],headers={'User-Agent':UA})
            try:
                with urllib.request.urlopen(req,timeout=90) as r, open(os.path.join(outdir,fn),'wb') as f: f.write(r.read())
                kept.append({'title':p['title'],'file':fn,'url':ii['thumburl'],'width':ii['width']})
            except Exception as e: print('dl',e)
        man[slug]={'query':cat,'candidates':kept}
        print(slug,len(kept),[k['title'][:55] for k in kept])
    except Exception as e: print('ERR',slug,e)
json.dump(man,open(os.path.join(outdir,'manifest.json'),'w'),indent=1)
