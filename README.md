# EduCare client demo

A clickable, fictional-data prototype for reviewing student, parent, field-agent, counsellor, and admin flows.

## Demo boundaries

This prototype is for product review only. OTP, payments, calls, file uploads, GPS, notifications, and report downloads are simulated. Do not enter real student, family, health, financial, or identity information. It is not a production service and does not provide counselling or emergency care.

## 10-minute walkthrough

1. **Onboarding and consent** — Start with the student path, enter any 6-digit OTP, choose class/board/medium, and complete the simulated guardian consent. Confirm that the free starter pack stays locked until consent.
2. **Free starter pack** — Open the student home and browse the free counselling videos, board masterclasses, and sample notes.
3. **Paywall and entitlement** — Open a locked learning item. Try the demo entitlement switcher to compare Free, Premium, Free Access, and Expired. Try the student purchase flow and confirm it routes to parent payment.
4. **Academic content** — Browse a seeded board/class/subject/topic, then try the Video, PDF, Print, and Images tabs. Check an unseeded board/class for its coming-soon state.
5. **Parent visit request** — Switch to Parent, choose a linked child, complete the visit request, and review the visit status timeline.
6. **Field-agent report** — Switch to Field Agent, check in, complete the visit checklist, and submit the simulated report.
7. **Parent report review** — Switch back to the linked Parent and review the report, checklist, evidence placeholders, and follow-up action. Confirm student/staff views do not expose parent-only reports.
8. **Scholarship approval** — Submit or open an EWS application, then use the Demo Panel fast-forward control. Confirm approval grants Free Access and unlocks premium demo content.
9. **Live support** — Switch to Student with Premium or Free Access, open the Live Hub, and try chat, voice, or video. Try a safety phrase to view the simulated helpline alert.
10. **Client feedback** — Open `/confirm`, mark each feature area approved or needing changes, add comments, and download the feedback JSON.

## Product decisions still requiring client sign-off

The accompanying brief identifies unresolved production decisions, including pricing and who pays, pilot cities and visit economics, student notification/refusal rules, visit-report content, counsellor qualifications and crisis escalation, content licensing/languages, EWS eligibility and document retention, and legal review for children's data. This demo does not resolve those decisions.
