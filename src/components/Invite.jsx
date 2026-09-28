import { Reveal, Parallax } from './ui'
import { Corner, Divider, EventIcon, Lotus, Sprig } from './Ornaments'
import { config } from '../config'

export default function Invite() {
  return (
    <div className="bg-blush relative px-5 py-24">
      <Parallax speed={0.6} rotate={10} className="pointer-events-none absolute top-10 -right-4 w-12 opacity-70">
        <Sprig className="w-full -scale-x-100" />
      </Parallax>
      <Parallax speed={0.8} className="pointer-events-none absolute bottom-6 -left-8 w-32 opacity-80">
        <Lotus className="w-full" />
      </Parallax>

      <Reveal className="relative mx-auto max-w-md rounded-[28px] border border-gold-300 bg-ivory/90 px-6 py-12 text-center shadow-[0_30px_60px_-30px_rgba(158,74,63,.35)]">
          <Corner className="absolute top-2 left-2 w-12" />
          <Corner className="absolute top-2 right-2 w-12 -scale-x-100" />
          <Corner className="absolute bottom-2 left-2 w-12 -scale-y-100" />
          <Corner className="absolute right-2 bottom-2 w-12 -scale-100" />

          <EventIcon name="kalash" className="mx-auto w-12 text-gold-400" />
          <p className="mt-4 font-yatra text-2xl text-blush-400">जय जोहार</p>
          <p className="mt-1 font-display text-[10px] tracking-[0.35em] text-gold-500 uppercase">सादर नेवता · A Warm Invitation</p>

          <Divider className="my-6" />

          {/* Chhattisgarhi invitation */}
          <p className="font-deva text-[16px] leading-[1.9] text-cocoa-800">
            मंगलमय बेरा म, गणपति बप्पा के आसीरवाद अउ सियान मन के मया ले, हमर घर म खुसी के सुघ्घर अवसर आए हे।
            <br />
            <span className="font-semibold text-blush-500">{config.groom.name}</span> अउ <span className="font-semibold text-blush-500">{config.bride.name}</span> के सगाई म आप मन ल सपरिवार सादर नेवता हे।
          </p>

          <Divider className="my-6" />

          <p className="font-serif text-lg leading-relaxed text-cocoa-700 italic">
            With the divine blessings of Lord Ganesha and the love of our elders, we joyfully invite you and your family to grace the Sagai ceremony of
          </p>
          <p className="mt-5 font-script text-[2.6rem] leading-tight text-rose">{config.groom.fullName}</p>
          <p className="font-display text-sm text-gold-500">&amp;</p>
          <p className="font-script text-[2.6rem] leading-tight text-rose">{config.bride.fullName}</p>
          <p className="mt-6 font-serif text-base text-cocoa-700">Your presence and blessings will make this auspicious moment complete.</p>
          <p className="mt-6 font-deva text-sm text-gold-500">आप मन के अगोरा म · {config.hostFamily}</p>
        </Reveal>
    </div>
  )
}
