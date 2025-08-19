function Time() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-center leading-[0] p-0 relative shrink-0 text-[#ff382b] text-[10px] text-nowrap text-right tracking-[0.12px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[12px] text-nowrap whitespace-pre">9:41</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[12px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[12px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function SeparatorsAndDot() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow h-px items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Separators and Dot"
    >
      <div className="bg-[#ff382b] h-px shrink-0 w-[5px]" data-name="Separator" />
      <div className="bg-[#ff382b] relative rounded-[100px] shrink-0 size-[7px]" data-name="Dot">
        <div
          aria-hidden="true"
          className="absolute border-[#ffffff] border-[0.5px] border-solid inset-[-0.5px] pointer-events-none rounded-[100.5px]"
        />
      </div>
      <div className="basis-0 bg-[#ff382b] grow h-px min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function TimeAndLine() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Time and Line">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-0.5 h-px items-center justify-center pl-1.5 pr-0 py-0 relative w-full">
          <Time />
          <SeparatorsAndDot />
        </div>
      </div>
    </div>
  );
}

function CalendarNowLine() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 p-0 right-0 translate-y-[-50%] z-[4]"
      data-name=".Calendar Now Line"
      style={{ top: "calc(50% - 109.5px)" }}
    >
      <TimeAndLine />
    </div>
  );
}

function TitleAndDesc() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Title and Desc">
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-center px-[3px] py-0 relative size-full">
          <div
            className="font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[0] relative shrink-0 text-[#106895] text-[13px] text-left text-nowrap tracking-[-0.08px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Feed Minerva 🐱</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Event() {
  return (
    <div
      className="basis-0 bg-[rgba(27,173,248,0.2)] grow min-h-px min-w-px relative rounded-[5px] shrink-0 w-full"
      data-name="Event"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start pl-[3px] pr-0 py-0 relative size-full">
          <TitleAndDesc />
          <div className="absolute bg-[#1badf8] bottom-0 left-0 top-0 w-[3px]" data-name="Border" />
        </div>
      </div>
    </div>
  );
}

function CalendarEvent() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[21px] items-start justify-start left-[55px] p-0 right-0.5 top-[334px] z-[3]"
      data-name=".Calendar Event"
    >
      <Event />
    </div>
  );
}

function TitleAndDesc1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title and Desc">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-[3px] relative w-full">
          <div
            className="font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[0] relative shrink-0 text-[#106895] text-[13px] text-left text-nowrap tracking-[-0.08px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Work 🧑‍💻</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Event1() {
  return (
    <div
      className="basis-0 bg-[rgba(27,173,248,0.2)] grow min-h-px min-w-px relative rounded-[5px] shrink-0 w-full"
      data-name="Event"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start pl-[3px] pr-0 py-0 relative size-full">
          <TitleAndDesc1 />
          <div className="absolute bg-[#1badf8] bottom-0 left-0 top-0 w-[3px]" data-name="Border" />
        </div>
      </div>
    </div>
  );
}

function CalendarEvent1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[197px] items-start justify-start left-[55px] p-0 right-0.5 top-[408px] z-[2]"
      data-name=".Calendar Event"
    >
      <Event1 />
    </div>
  );
}

function Time1() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">12</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time1 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine1 />
    </div>
  );
}

function CalendarHourGrid() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour />
    </div>
  );
}

function Time2() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">1</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time2 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour1() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine2 />
    </div>
  );
}

function CalendarHourGrid1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour1 />
    </div>
  );
}

function Time3() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">2</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time3 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour2() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine3 />
    </div>
  );
}

function CalendarHourGrid2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour2 />
    </div>
  );
}

function Time4() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">3</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time4 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour3() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine4 />
    </div>
  );
}

function CalendarHourGrid3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour3 />
    </div>
  );
}

function Time5() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">4</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time5 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour4() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine5 />
    </div>
  );
}

function CalendarHourGrid4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour4 />
    </div>
  );
}

function Time6() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">5</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time6 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour5() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine6 />
    </div>
  );
}

function CalendarHourGrid5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour5 />
    </div>
  );
}

function Time7() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">6</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine7() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time7 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour6() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine7 />
    </div>
  );
}

function CalendarHourGrid6() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour6 />
    </div>
  );
}

function Time8() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">7</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine8() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time8 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour7() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine8 />
    </div>
  );
}

function CalendarHourGrid7() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour7 />
    </div>
  );
}

function Time9() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">8</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine9() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time9 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour8() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine9 />
    </div>
  );
}

function CalendarHourGrid8() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour8 />
    </div>
  );
}

function Time10() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">9</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine10() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time10 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour9() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine10 />
    </div>
  );
}

function CalendarHourGrid9() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour9 />
    </div>
  );
}

function Time11() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">10</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine11() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time11 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour10() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine11 />
    </div>
  );
}

function CalendarHourGrid10() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour10 />
    </div>
  );
}

function Time12() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">11</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">AM</p>
      </div>
    </div>
  );
}

function TimeAndLine12() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time12 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour11() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine12 />
    </div>
  );
}

function CalendarHourGrid11() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour11 />
    </div>
  );
}

function Time13() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">12</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine13() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time13 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour12() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine13 />
    </div>
  );
}

function CalendarHourGrid12() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour12 />
    </div>
  );
}

function Time14() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">1</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine14() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time14 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour13() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine14 />
    </div>
  );
}

function CalendarHourGrid13() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour13 />
    </div>
  );
}

function Time15() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">2</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine15() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time15 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour14() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine15 />
    </div>
  );
}

function CalendarHourGrid14() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour14 />
    </div>
  );
}

function Time16() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">3</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine16() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time16 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour15() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine16 />
    </div>
  );
}

function CalendarHourGrid15() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour15 />
    </div>
  );
}

function Time17() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">4</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine17() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time17 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour16() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine17 />
    </div>
  );
}

function CalendarHourGrid16() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour16 />
    </div>
  );
}

function Time18() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">5</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine18() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time18 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour17() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine18 />
    </div>
  );
}

function CalendarHourGrid17() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour17 />
    </div>
  );
}

function Time19() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">6</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine19() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time19 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour18() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine19 />
    </div>
  );
}

function CalendarHourGrid18() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour18 />
    </div>
  );
}

function Time20() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">7</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine20() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time20 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour19() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine20 />
    </div>
  );
}

function CalendarHourGrid19() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour19 />
    </div>
  );
}

function Time21() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">8</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine21() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time21 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour20() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine21 />
    </div>
  );
}

function CalendarHourGrid20() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour20 />
    </div>
  );
}

function Time22() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">9</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine22() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time22 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour21() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine22 />
    </div>
  );
}

function CalendarHourGrid21() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour21 />
    </div>
  );
}

function Time23() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">10</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine23() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time23 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour22() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine23 />
    </div>
  );
}

function CalendarHourGrid22() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour22 />
    </div>
  );
}

function Time24() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['SF_Pro:Semibold',_sans-serif] font-[590] items-center justify-end leading-[0] pl-0 pr-[5px] py-0 relative shrink-0 text-[#8e8e93] text-[11px] text-nowrap text-right tracking-[0.06px] w-[52px]"
      data-name="Time"
    >
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">11</p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre"> </p>
      </div>
      <div className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="adjustLetterSpacing block leading-[13px] text-nowrap whitespace-pre">PM</p>
      </div>
    </div>
  );
}

function TimeAndLine24() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Time and Line"
    >
      <Time24 />
      <div className="basis-0 bg-[#c7c7cc] grow h-[0.66px] min-h-px min-w-px shrink-0" data-name="Separator" />
    </div>
  );
}

function Hour23() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[50px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Hour"
    >
      <TimeAndLine24 />
    </div>
  );
}

function CalendarHourGrid23() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name=".Calendar Hour Grid"
    >
      <Hour23 />
    </div>
  );
}

function CalendarFullGrid() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full z-[1]"
      data-name=".Calendar Full Grid"
    >
      <CalendarHourGrid />
      <CalendarHourGrid1 />
      <CalendarHourGrid2 />
      <CalendarHourGrid3 />
      <CalendarHourGrid4 />
      <CalendarHourGrid5 />
      <CalendarHourGrid6 />
      <CalendarHourGrid7 />
      <CalendarHourGrid8 />
      <CalendarHourGrid9 />
      <CalendarHourGrid10 />
      <CalendarHourGrid11 />
      <CalendarHourGrid12 />
      <CalendarHourGrid13 />
      <CalendarHourGrid14 />
      <CalendarHourGrid15 />
      <CalendarHourGrid16 />
      <CalendarHourGrid17 />
      <CalendarHourGrid18 />
      <CalendarHourGrid19 />
      <CalendarHourGrid20 />
      <CalendarHourGrid21 />
      <CalendarHourGrid22 />
      <CalendarHourGrid23 />
    </div>
  );
}

export default function DayEvents() {
  return (
    <div
      className="box-border content-stretch flex flex-col isolate items-start justify-start p-0 relative size-full"
      data-name="Day Events"
    >
      <CalendarNowLine />
      <CalendarEvent />
      <CalendarEvent1 />
      <CalendarFullGrid />
    </div>
  );
}