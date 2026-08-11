import {
  ArrowRight,
  Sparkles,
  Check,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BuyComboCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        to="/build-your-combo"
        className="
          group
          relative
          block
          overflow-hidden
          rounded-[32px]
          sm:rounded-[40px]
          bg-[#184C35]
          shadow-[0_25px_70px_rgba(24,76,53,0.16)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_35px_90px_rgba(24,76,53,0.22)]
        "
      >
        {/* =================================================
            DECORATIVE BACKGROUND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-32
            h-80
            w-80
            rounded-full
            bg-[#3E8C57]/30
            blur-3xl
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            right-1/3
            h-80
            w-80
            rounded-full
            bg-[#D7A326]/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-20
            bottom-0
            h-48
            w-48
            rounded-full
            bg-[#E86A30]/10
            blur-3xl
          "
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            relative
            grid
            gap-7
            px-5
            py-7
            sm:gap-10
            sm:px-7
            sm:py-9
            md:grid-cols-[1fr_auto]
            md:items-center
            md:px-12
            md:py-11
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div>
            {/* Small label */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#F6F3EC]/15
                bg-white/10
                px-3.5
                py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#F8E6DF]
                sm:px-4
                sm:text-[11px]
                sm:tracking-[0.16em]
              "
            >
              <Sparkles size={13} className="sm:h-[14px] sm:w-[14px]" />

              Mix. Match. Munch.
            </div>

            {/* Heading */}

            <h2
              className="
                mt-4
                max-w-2xl
                text-[2.15rem]
                leading-[1.04]
                tracking-tight
                text-white
                sm:mt-5
                sm:text-5xl
                md:text-6xl
              "
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Your snacks.
              <br />

              <span className="text-[#D7A326]">
                Your perfect combo.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-white/70
                sm:mt-5
                sm:text-base
                sm:leading-7
                md:text-lg
              "
            >
              Choose your favourite PopFresh
              flavours and create a box made
              just for you.
            </p>

            {/* =================================================
                PACK OPTIONS
            ================================================= */}

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-2.5
                sm:mt-7
                sm:gap-3
              "
            >
              {/* Pack 2 */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-3.5
                  py-2
                  text-xs
                  font-medium
                  text-white
                  sm:px-4
                  sm:py-2.5
                  sm:text-sm
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#3E8C57]
                  "
                >
                  <Check size={12} />
                </span>

                Pack of 2
              </div>

              {/* Pack 3 */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-3.5
                  py-2
                  text-xs
                  font-medium
                  text-white
                  sm:px-4
                  sm:py-2.5
                  sm:text-sm
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#3E8C57]
                  "
                >
                  <Check size={12} />
                </span>

                Pack of 3
              </div>

              {/* Pack 4 */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-3.5
                  py-2
                  text-xs
                  font-medium
                  text-white
                  sm:px-4
                  sm:py-2.5
                  sm:text-sm
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#3E8C57]
                  "
                >
                  <Check size={12} />
                </span>

                Pack of 4
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SHOPPING CARD
          ================================================= */}

          <div
            className="
              relative
              w-full
              md:w-[270px]
            "
          >
            <div
              className="
                overflow-hidden
                rounded-[24px]
                bg-[#F6F3EC]
                p-4
                shadow-2xl
                transition-transform
                duration-500
                group-hover:scale-[1.025]
                sm:rounded-[28px]
                sm:p-5
              "
            >
              {/* Top */}

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#667085]
                      sm:text-[10px]
                      sm:tracking-[0.16em]
                    "
                  >
                    CUSTOM BOX
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-semibold
                      leading-tight
                      text-[#184C35]
                      sm:text-xl
                    "
                    style={{
                      fontFamily: "Fraunces, serif",
                    }}
                  >
                    Pick your favourites
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF4EB]
                    text-[#3E8C57]
                    sm:h-11
                    sm:w-11
                    sm:rounded-2xl
                  "
                >
                  <ShoppingBag size={19} className="sm:h-[21px] sm:w-[21px]" />
                </div>
              </div>

              {/* =================================================
                  FLAVOUR PREVIEW
              ================================================= */}

              <div className="mt-5 flex items-center sm:mt-6">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-[#F6F3EC]
                    bg-[#E86A30]
                    text-base
                    font-bold
                    text-white
                    shadow-sm
                    sm:h-14
                    sm:w-14
                    sm:border-4
                    sm:text-lg
                  "
                >
                  +
                </div>

                <div
                  className="
                    -ml-3
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-[#F6F3EC]
                    bg-[#D7A326]
                    text-base
                    font-bold
                    text-white
                    shadow-sm
                    sm:h-14
                    sm:w-14
                    sm:border-4
                    sm:text-lg
                  "
                >
                  +
                </div>

                <div
                  className="
                    -ml-3
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-[#F6F3EC]
                    bg-[#3E8C57]
                    text-base
                    font-bold
                    text-white
                    shadow-sm
                    sm:h-14
                    sm:w-14
                    sm:border-4
                    sm:text-lg
                  "
                >
                  +
                </div>

                <div
                  className="
                    -ml-3
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-[#F6F3EC]
                    bg-[#D94E43]
                    text-base
                    font-bold
                    text-white
                    shadow-sm
                    sm:h-14
                    sm:w-14
                    sm:border-4
                    sm:text-lg
                  "
                >
                  +
                </div>
              </div>

              {/* Divider */}

              <div className="my-4 border-t border-[#E4DED3] sm:my-5" />

              {/* CTA */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-full
                  bg-[#184C35]
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  group-hover:bg-[#215F42]
                  sm:px-5
                  sm:py-3.5
                  sm:text-sm
                "
              >
                <span>
                  Build My Combo
                </span>

                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    sm:h-8
                    sm:w-8
                  "
                >
                  <ArrowRight
                    size={15}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      sm:h-[17px]
                      sm:w-[17px]
                    "
                  />
                </span>
              </div>
            </div>

            {/* =================================================
                FLOATING BADGE
            ================================================= */}

            <div
              className="
                absolute
                -right-1
                -top-3
                rotate-3
                rounded-full
                bg-[#D7A326]
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-[#184C35]
                shadow-lg
                transition-transform
                duration-300
                group-hover:rotate-6
                sm:-right-3
                sm:-top-4
                sm:px-4
                sm:py-2
                sm:text-xs
              "
            >
              Made for you
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

// import {
//   ArrowRight,
//   Sparkles,
//   Check,
//   ShoppingBag,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function BuyComboCTA() {
//   return (
//     <section className="mx-auto max-w-7xl px-6 py-16">
//       <Link
//         to="/build-your-combo"
//         className="
//           group
//           relative
//           block
//           overflow-hidden
//           rounded-[40px]
//           bg-[#184C35]
//           shadow-[0_25px_70px_rgba(24,76,53,0.16)]
//           transition-all
//           duration-500
//           hover:-translate-y-1
//           hover:shadow-[0_35px_90px_rgba(24,76,53,0.22)]
//         "
//       >
//         {/* =================================================
//             DECORATIVE BACKGROUND
//         ================================================= */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             -right-24
//             -top-32
//             h-80
//             w-80
//             rounded-full
//             bg-[#3E8C57]/30
//             blur-3xl
//             transition-transform
//             duration-700
//             group-hover:scale-110
//           "
//         />

//         <div
//           className="
//             pointer-events-none
//             absolute
//             -bottom-40
//             right-1/3
//             h-80
//             w-80
//             rounded-full
//             bg-[#D7A326]/20
//             blur-3xl
//           "
//         />

//         <div
//           className="
//             pointer-events-none
//             absolute
//             -left-20
//             bottom-0
//             h-48
//             w-48
//             rounded-full
//             bg-[#E86A30]/10
//             blur-3xl
//           "
//         />

//         {/* =================================================
//             CONTENT
//         ================================================= */}

//         <div
//           className="
//             relative
//             grid
//             gap-10
//             px-7
//             py-9
//             md:grid-cols-[1fr_auto]
//             md:items-center
//             md:px-12
//             md:py-11
//           "
//         >
//           {/* =================================================
//               LEFT CONTENT
//           ================================================= */}

//           <div>
//             {/* Small label */}

//             <div
//               className="
//                 inline-flex
//                 items-center
//                 gap-2
//                 rounded-full
//                 border
//                 border-[#F6F3EC]/15
//                 bg-white/10
//                 px-4
//                 py-2
//                 text-[11px]
//                 font-semibold
//                 uppercase
//                 tracking-[0.16em]
//                 text-[#F8E6DF]
//               "
//             >
//               <Sparkles size={14} />

//               Mix. Match. Munch.
//             </div>

//             {/* Heading */}

//             <h2
//               className="
//                 mt-5
//                 max-w-2xl
//                 text-4xl
//                 leading-[1.05]
//                 tracking-tight
//                 text-white
//                 sm:text-5xl
//                 md:text-6xl
//               "
//               style={{
//                 fontFamily: "Fraunces, serif",
//               }}
//             >
//               Your snacks.
//               <br />

//               <span className="text-[#D7A326]">
//                 Your perfect combo.
//               </span>
//             </h2>

//             {/* Description */}

//             <p
//               className="
//                 mt-5
//                 max-w-xl
//                 text-base
//                 leading-7
//                 text-white/70
//                 md:text-lg
//               "
//             >
//               Choose your favourite PopFresh
//               flavours and create a box made
//               just for you.
//             </p>

//             {/* =================================================
//                 PACK OPTIONS
//             ================================================= */}

//             <div
//               className="
//                 mt-7
//                 flex
//                 flex-wrap
//                 gap-3
//               "
//             >
//               {/* Pack 2 */}

//               <div
//                 className="
//                   inline-flex
//                   items-center
//                   gap-2
//                   rounded-full
//                   bg-white/10
//                   px-4
//                   py-2.5
//                   text-sm
//                   font-medium
//                   text-white
//                 "
//               >
//                 <span
//                   className="
//                     flex
//                     h-5
//                     w-5
//                     items-center
//                     justify-center
//                     rounded-full
//                     bg-[#3E8C57]
//                   "
//                 >
//                   <Check size={12} />
//                 </span>

//                 Pack of 2
//               </div>

//               {/* Pack 3 */}

//               <div
//                 className="
//                   inline-flex
//                   items-center
//                   gap-2
//                   rounded-full
//                   bg-white/10
//                   px-4
//                   py-2.5
//                   text-sm
//                   font-medium
//                   text-white
//                 "
//               >
//                 <span
//                   className="
//                     flex
//                     h-5
//                     w-5
//                     items-center
//                     justify-center
//                     rounded-full
//                     bg-[#3E8C57]
//                   "
//                 >
//                   <Check size={12} />
//                 </span>

//                 Pack of 3
//               </div>

//               {/* Pack 4 */}

//               <div
//                 className="
//                   inline-flex
//                   items-center
//                   gap-2
//                   rounded-full
//                   bg-white/10
//                   px-4
//                   py-2.5
//                   text-sm
//                   font-medium
//                   text-white
//                 "
//               >
//                 <span
//                   className="
//                     flex
//                     h-5
//                     w-5
//                     items-center
//                     justify-center
//                     rounded-full
//                     bg-[#3E8C57]
//                   "
//                 >
//                   <Check size={12} />
//                 </span>

//                 Pack of 4
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               RIGHT SHOPPING CARD
//           ================================================= */}

//           <div
//             className="
//               relative
//               w-full
//               md:w-[270px]
//             "
//           >
//             <div
//               className="
//                 overflow-hidden
//                 rounded-[28px]
//                 bg-[#F6F3EC]
//                 p-5
//                 shadow-2xl
//                 transition-transform
//                 duration-500
//                 group-hover:scale-[1.025]
//               "
//             >
//               {/* Top */}

//               <div className="flex items-start justify-between">
//                 <div>
//                   <p
//                     className="
//                       text-[10px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.16em]
//                       text-[#667085]
//                     "
//                   >
//                     CUSTOM BOX
//                   </p>

//                   <p
//                     className="
//                       mt-1
//                       text-xl
//                       font-semibold
//                       text-[#184C35]
//                     "
//                     style={{
//                       fontFamily: "Fraunces, serif",
//                     }}
//                   >
//                     Pick your favourites
//                   </p>
//                 </div>

//                 <div
//                   className="
//                     flex
//                     h-11
//                     w-11
//                     items-center
//                     justify-center
//                     rounded-2xl
//                     bg-[#EAF4EB]
//                     text-[#3E8C57]
//                   "
//                 >
//                   <ShoppingBag size={21} />
//                 </div>
//               </div>

//               {/* =================================================
//                   FLAVOUR PREVIEW
//               ================================================= */}

//               <div className="mt-6 flex items-center">
//                 <div
//                   className="
//                     flex
//                     h-14
//                     w-14
//                     items-center
//                     justify-center
//                     rounded-full
//                     border-4
//                     border-[#F6F3EC]
//                     bg-[#E86A30]
//                     text-lg
//                     font-bold
//                     text-white
//                     shadow-sm
//                   "
//                 >
//                   +
//                 </div>

//                 <div
//                   className="
//                     -ml-3
//                     flex
//                     h-14
//                     w-14
//                     items-center
//                     justify-center
//                     rounded-full
//                     border-4
//                     border-[#F6F3EC]
//                     bg-[#D7A326]
//                     text-lg
//                     font-bold
//                     text-white
//                     shadow-sm
//                   "
//                 >
//                   +
//                 </div>

//                 <div
//                   className="
//                     -ml-3
//                     flex
//                     h-14
//                     w-14
//                     items-center
//                     justify-center
//                     rounded-full
//                     border-4
//                     border-[#F6F3EC]
//                     bg-[#3E8C57]
//                     text-lg
//                     font-bold
//                     text-white
//                     shadow-sm
//                   "
//                 >
//                   +
//                 </div>

//                 <div
//                   className="
//                     -ml-3
//                     flex
//                     h-14
//                     w-14
//                     items-center
//                     justify-center
//                     rounded-full
//                     border-4
//                     border-[#F6F3EC]
//                     bg-[#D94E43]
//                     text-lg
//                     font-bold
//                     text-white
//                     shadow-sm
//                   "
//                 >
//                   +
//                 </div>
//               </div>

//               {/* Divider */}

//               <div className="my-5 border-t border-[#E4DED3]" />

//               {/* CTA */}

//               <div
//                 className="
//                   flex
//                   items-center
//                   justify-between
//                   rounded-full
//                   bg-[#184C35]
//                   px-5
//                   py-3.5
//                   text-sm
//                   font-semibold
//                   text-white
//                   transition-all
//                   duration-300
//                   group-hover:bg-[#215F42]
//                 "
//               >
//                 <span>
//                   Build My Combo
//                 </span>

//                 <span
//                   className="
//                     flex
//                     h-8
//                     w-8
//                     items-center
//                     justify-center
//                     rounded-full
//                     bg-white/10
//                   "
//                 >
//                   <ArrowRight
//                     size={17}
//                     className="
//                       transition-transform
//                       duration-300
//                       group-hover:translate-x-0.5
//                     "
//                   />
//                 </span>
//               </div>
//             </div>

//             {/* =================================================
//                 FLOATING BADGE
//             ================================================= */}

//             <div
//               className="
//                 absolute
//                 -right-3
//                 -top-4
//                 rotate-3
//                 rounded-full
//                 bg-[#D7A326]
//                 px-4
//                 py-2
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#184C35]
//                 shadow-lg
//                 transition-transform
//                 duration-300
//                 group-hover:rotate-6
//               "
//             >
//               Made for you
//             </div>
//           </div>
//         </div>
//       </Link>
//     </section>
//   );
// }