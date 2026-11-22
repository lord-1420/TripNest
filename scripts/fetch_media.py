import json, os, re, sys, time, urllib.parse, urllib.request

UA = "TripNestDev/1.0 (educational project; contact: dev@tripnest.local)"
API = "https://commons.wikimedia.org/w/api.php"

def api(params):
    params = dict(params); params['format'] = 'json'
    url = API + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)

def strip(html):
    return re.sub(r'<[^>]+>', '', html or '').strip()

def candidates(query, n=6):
    data = api({'action':'query','generator':'search','gsrsearch':f'filetype:bitmap {query}',
                'gsrnamespace':6,'gsrlimit':n,'prop':'imageinfo',
                'iiprop':'url|size|extmetadata','iiurlwidth':2000})
    pages = (data.get('query') or {}).get('pages') or {}
    out = []
    for p in pages.values():
        ii = (p.get('imageinfo') or [{}])[0]
        if not ii.get('thumburl'): continue
        if ii.get('width',0) < 1200: continue
        if p['title'].lower().endswith(('.svg','.png','.gif','.tif','.tiff')): continue
        md = ii.get('extmetadata') or {}
        out.append({
            'title': p['title'], 'url': ii['thumburl'], 'orig': ii['url'],
            'width': ii['width'], 'height': ii['height'],
            'license': strip(md.get('LicenseShortName',{}).get('value','')),
            'artist': strip(md.get('Artist',{}).get('value','')),
            'credit': strip(md.get('Credit',{}).get('value','')),
            'desc': strip(md.get('ImageDescription',{}).get('value',''))[:300],
            'page': 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(p['title'].replace(' ','_')),
            'index': p.get('index', 99),
        })
    out.sort(key=lambda x: x['index'])
    return out

def download(url, dest):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=90) as r, open(dest,'wb') as f:
        f.write(r.read())

if __name__ == '__main__':
    items = json.load(open(sys.argv[1]))
    outdir = sys.argv[2]; os.makedirs(outdir, exist_ok=True)
    manifest = {}
    for slug, query in items.items():
        try:
            c = candidates(query)
        except Exception as e:
            print('ERR', slug, e); continue
        kept = []
        for i, cand in enumerate(c[:4]):
            fn = f"{slug}__{i}.jpg"
            try:
                download(cand['url'], os.path.join(outdir, fn))
                cand['file'] = fn
                kept.append(cand)
            except Exception as e:
                print('DLERR', slug, e)
        manifest[slug] = {'query': query, 'candidates': kept}
        print(slug, len(kept), [k['title'][:60] for k in kept])
        time.sleep(0.3)
    json.dump(manifest, open(os.path.join(outdir,'manifest.json'),'w'), indent=1)
