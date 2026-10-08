# EduCare Client Prototype (@workspace/educare-prototype)

A clickable, interactive, responsive prototype for the **Student & Parent Platform ('EduCare')**, prepared for client review and technical sign-off.

## 🚀 How to Run

```bash
# Typecheck
pnpm run typecheck

# Production build
pnpm --filter @workspace/educare-prototype run build

# Local dev server
pnpm --filter @workspace/educare-prototype run dev
```

## 📋 10-Minute Client Demo Script

1. **Onboarding & Consent**: Start on Student role, enter any 6-digit OTP (e.g. `123456`), pick Class 10 CBSE English medium, check "I am the parent/guardian and I consent", and click **Unlock Starter Pack**. Note the celebratory modal confirming 3 free counselling videos, 2 masterclasses, and 3 sample PDFs.
2. **Academic Content & 4 Tabs**: Go to **Learn**, pick CBSE Class 10 Maths -> Chapter 4 -> *Pair of Linear Equations*. Try all 4 tabs:
   - **Video**: Note the dynamic watermark (`EDUCARE · AARAV S. · STU-01`), resume position (04:32), and speed controls.
   - **PDF**: Try page navigation, zoom (75%–150%), and observe the read-only download restriction badge.
   - **Print**: View the physical workbook product (₹149), test address input, check under-18 minor "Ask Parent to Pay" logic, and review the live shipment tracking timeline (Placed -> Packed -> Shipped -> Delivered).
   - **Images**: Click any formula or diagram chart to open the interactive Lightbox Zoom viewer.
3. **EWS Scholarship Application**: Navigate to **Scholarship**. Fill in household income, occupation, select state, upload an income certificate (`Income_Certificate_2025.pdf`), check the declaration, and submit. Open the left drawer **Demo Panel** and click **Fast-forward EWS** to simulate immediate Admin approval and observe entitlement change to **Free Access**.
4. **Wellness & Mood Check-In**: Go to **Wellness**, tap your current feeling (Calm, Okay, Tired, Worried, Stressed), view saved mood feedback, and browse mental health videos.
5. **Live Hub & 3-Mode Session Room**: Go to **Live**, pick *Dr. Rhea Menon*, and start a session. Switch between **Chat**, **Voice**, and **Video** modes. Type safety keywords like `"hopeless"` or `"hurt myself"` to test the automatic crisis safety alert and Tele-MANAS (14416) / Emergency (112) helpline card.
6. **Parent Visit Request & Timeline**: Switch preview role to **Parent** in the Demo Panel. Go to **Visits**, click **Request Physical Visit**, choose focus areas (hostel hygiene, food quality, study routine), confirm the ₹999 demo payment, and check the status timeline.
7. **Parent Verified Reports & PDF Preview**: Go to **Reports**. Review the 6-point checklist breakdown (Green/Amber/Red), verified photo gallery, and click **Download Watermarked PDF** to inspect the official report modal preview.
8. **Field Agent Portal**: Switch role to **Field Agent**. Perform simulated **GPS Check-In**, fill the 6-point observation checklist, add photo evidence, and test the Emergency SOS alert.
9. **Admin Portal & EWS Approvals**: Switch role to **Admin**. Review KPI cards, inspect the **Scholarship Review Queue**, test document approval, and examine the 6 Boards x 7 Classes Taxonomy Heatmap Matrix.
10. **Client Sign-off Checklist (`/confirm`)**: Open `/confirm` from the sidebar navigation. Review the 11 feature areas, check approval boxes, type feedback notes, and click **Download My Feedback as JSON**.
