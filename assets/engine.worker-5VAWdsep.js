(function(){async function e(e){let t=await fetch(e);if(!t.ok)throw Error(`${e}: ${t.status}`);return t.arrayBuffer()}function t(e){return new Promise((t,n)=>{let r=loadBergamot({INITIAL_MEMORY:41943040,wasmBinary:e,print:()=>{},getOrCreateSentenceSegmenter:()=>({segment:e=>[{segment:e}]}),onAbort:()=>n(/* @__PURE__ */ Error(`Bergamot aborted`)),onRuntimeInitialized:()=>queueMicrotask(()=>t(r))})})}function n(e,t,n){let r=new e.AlignedMemory(t.byteLength,n);return r.getByteArrayView().set(new Uint8Array(t)),r}async function r({base:r,files:i}){importScripts(r+i.glue);let[a,o,s]=await Promise.all([i.wasm,i.model,i.vocab].map(t=>e(r+t))),c=await t(a),l=new c.AlignedMemoryList;l.push_back(n(c,s,64));let u=new c.TranslationModel(`en`,`ru`,`beam-size: 1
normalize: 1.0
word-penalty: 0
max-length-break: 128
mini-batch-words: 1024
workspace: 128
max-length-factor: 2.0
skip-cost: true
cpu-threads: 0
quiet: true
quiet-translation: true
gemm-precision: int8shiftAlphaAll
alignment: soft
`,n(c,o,256),null,l,null),d=new c.BlockingService({cacheSize:0});return e=>{let t=new c.VectorString,n=new c.VectorResponseOptions;try{t.push_back(e),n.push_back({qualityScores:!1,alignment:!1,html:!1});let r=d.translate(u,t,n);try{return r.get(0).getTranslatedText()}finally{r.delete()}}finally{t.delete(),n.delete()}}}let i;async function a(e,t){let n;try{if(!i)throw Error(`Engine is not loaded`);n={id:e,text:(await i)(t)}}catch(t){n={id:e,error:t instanceof Error?t.message:String(t)}}postMessage(n)}addEventListener(`message`,({data:e})=>{e.type===`load`?(i=r(e),i.catch(()=>{})):a(e.id,e.text)})})();