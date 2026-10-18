# SkillProof AI — MVP Design
**Date:** 17 Oct 2026 | **Scope:** ALL FOUR tests (user decision: "sirf ik test ni, saary he hon!")
**Pilot:** Roots Academy

---

## 🎯 MVP Goal
Prove: "Teacher ka time bachta hai + students ko verified certificates milte hain"

---

## 📝 MVP = 5 Tests!

### Test 1: ⌨️ Typing Test (English)
- Paragraph display → student types (3 min)
- Auto: WPM + Accuracy
- Pass: 25+ WPM, 90%+ accuracy

### Test 2: 📝 MS Word
- **MCQ** (10 questions, 10 min) — shortcuts, features
- **Practical** (15 min, in-browser editor):
  ☐ Heading lagao | ☐ Text BOLD karo | ☐ 3x3 table banao
- Auto-check: heading? bold? table?

### Test 3: 📊 MS Excel
- **MCQ** (10 questions, 10 min) — formulas, functions
- **Practical** (15 min, in-browser mini-spreadsheet):
  ☐ A1=10, A2=20 likho | ☐ A3 mein =SUM(A1:A2)!
- Auto-check: values? formula? result?

### Test 4: 📽️ PowerPoint
- **MCQ** (10 questions, 10 min) — slides, transitions
- **Practical** (15 min, simplified slide editor):
  ☐ 3 slides banao | ☐ Har slide mein title lagao
- Auto-check: slide count? titles?

### Test 5: 📰 InPage (Urdu Composing)
- **MCQ** (10 questions, 10 min) — InPage tools, shortcuts, Nastaliq
- **Urdu Typing** (3 min) — Urdu paragraph type karo!
- Auto: Urdu WPM + Accuracy

---

## 👨‍🎓 Student Flow (Working)

```
1. Login (academy deta hai: student ID + password)
        ↓
2. Dashboard → 4 Tests dikhenge:
   ⌨️ Typing | 📝 MS Word | 📊 MS Excel | 📽️ PowerPoint
        ↓
3. Har test: MCQ + Practical (typing sirf typing)
        ↓
4. COMBINED RESULT:
   - Typing: 32 WPM ✅
   - MS Word: 85/100 ✅
   - MS Excel: 72/100 ✅
   - PowerPoint: 90/100 ✅
   - OVERALL: 82% → PASS! 🎓
        ↓
5. QR CERTIFICATE (har test ka alag + combined!)
```

---

## 🏗️ System Design

```
┌─────────────────────────────────────────┐
│           FRONTEND (Web App)            │
│  - Student: Login → Test → Result      │
│  - Teacher: Dashboard → Students →     │
│    Results → Certificates               │
│  - Tech: HTML/CSS/JS (no app install!) │
└──────────────┬──────────────────────────┘
               │ REST API
┌──────────────▼──────────────────────────┐
│           BACKEND (Python)              │
│  - Auth (academy → students)            │
│  - Test Engine (serve + evaluate)       │
│  - Typing evaluator (WPM calc)          │
│  - MCQ evaluator (answer matching)      │
│  - Practical evaluator (DOM checks:     │
│    heading? bold? table?)               │
│  - Certificate generator (QR + PDF)     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           DATABASE                      │
│  - Academies, Students, Tests,          │
│    Results, Certificates                │
│  - Firebase (ewntro) or PostgreSQL      │
└─────────────────────────────────────────┘
```

---

## 🔒 Anti-Cheat (MVP)
1. Teacher in computer lab (physical)
2. Timer on every section
3. Fullscreen mode (tab switch = flagged)
4. Randomized MCQ order
5. In-browser editor (no file upload = no AI injection)
6. Typing test (physically unfakeable)

---

## ❌ NOT in MVP
- Excel / PowerPoint (Phase 2)
- AI subjective evaluation (rule-based first)
- Payment gateway (manual for pilot)
- Mobile app (web only)
- Advanced analytics

---

## 💰 Business Model (Pilot)
- Roots Academy: FREE pilot (validation!)
- After proof: Rs 2,500/month per academy
- OR Rs 300/student certificate

---

## ✅ Success Criteria (Pilot)
- 20 students take the test
- Teacher saves 5+ hours vs manual checking
- 15+ certificates issued
- Academy says: "Iske paise denge!"
