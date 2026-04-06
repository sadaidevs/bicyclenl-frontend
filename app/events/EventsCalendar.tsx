import { toDateKey } from "@/lib/dateUtils"

type EventsCalendarProps = {
  currentMonth: Date
  selectedDateKey: string
  eventDateSet: Set<string>
  onPreviousMonth: () => void
  onNextMonth: () => void
  onSelectDate: (dateKey: string) => void
  monthLabelClassName?: string
  noteText?: string
  showAllDatesButton?: boolean
  onShowAllDates?: () => void
}

export default function EventsCalendar({
  currentMonth,
  selectedDateKey,
  eventDateSet,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
  monthLabelClassName,
  noteText,
  showAllDatesButton,
  onShowAllDates,
}: EventsCalendarProps) {
  const monthName = currentMonth.toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  })

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const leadingEmptyCells = Array.from({ length: firstDayOfMonth }, (_, index) => `empty-${index}`)
  const monthDates = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
  })

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onPreviousMonth}
          className="rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-600 transition hover:border-blue-400 hover:text-blue-700"
          aria-label="Previous month"
        >
          Prev
        </button>
        <p className={monthLabelClassName || "text-sm font-semibold text-gray-900"}>{monthName}</p>
        <button
          type="button"
          onClick={onNextMonth}
          className="rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-600 transition hover:border-blue-400 hover:text-blue-700"
          aria-label="Next month"
        >
          Next
        </button>
      </div>
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {leadingEmptyCells.map((cellKey) => (
          <div key={cellKey} className="h-9" />
        ))}
        {monthDates.map((dateValue) => {
          const dateKey = toDateKey(dateValue)
          const hasEvents = eventDateSet.has(dateKey)
          const isSelected = selectedDateKey === dateKey

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(dateKey)}
              className={`relative h-9 rounded-md transition ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {dateValue.getDate()}
              {hasEvents && (
                <span
                  className={`absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
                    isSelected ? "bg-white" : "bg-red-500"
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
      {noteText && <p className="mt-4 text-xs text-gray-500">{noteText}</p>}
      {showAllDatesButton && onShowAllDates && (
        <button
          type="button"
          onClick={onShowAllDates}
          className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-700"
        >
          Show all dates
        </button>
      )}
    </div>
  )
}
