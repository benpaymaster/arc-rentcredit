# 📋 Quick Testing Checklist

## Before Starting
- [ ] App running at http://localhost:3001
- [ ] Screen recording ready
- [ ] Feedback form open: `file:///.../feedback-form.html`
- [ ] Timer ready (15-20 min per session)
- [ ] Fresh browser (incognito mode)

## During Each Session

### Phase 1: Unguided (5-7 min)
- [ ] "Explore naturally, think out loud"
- [ ] Watch: Do they get the wallet requirement?
- [ ] Listen: Do they mention the motto?
- [ ] Note: Where do they pause/get confused?

### Phase 2: Guided (10-13 min)
- [ ] Walk through complete payment flow
- [ ] Test landlord property view
- [ ] Ask trust/clarity questions
- [ ] Get overall rating

### Essential Questions
- [ ] "What's your first impression?"
- [ ] "Can you remember the tagline?"
- [ ] "Would you trust this for real payments?"
- [ ] "What was most confusing?"
- [ ] "Rate overall experience 1-10"

## After Each Session
- [ ] Save feedback form data
- [ ] Quick notes in TESTING_GUIDE.md
- [ ] Reset browser for next user
- [ ] 5-min break

## Target Metrics
- [ ] 80%+ understand wallet requirement immediately  
- [ ] 70%+ recall motto after testing
- [ ] 8+/10 average wallet clarity rating
- [ ] 7+/10 average trust rating
- [ ] 8+/10 overall experience rating

## Red Flags 🚨
- Users consistently miss wallet requirement
- Multiple users stuck at same point  
- Trust ratings <6/10
- Motto recall <50%
- Negative quotes about security

## Files Ready
✅ `TESTING_GUIDE.md` - Complete protocol
✅ `feedback-form.html` - Data collection  
✅ `analyze-testing.sh` - Results analysis
✅ App running on localhost:3001

## Quick Commands
```bash
# Start app
cd frontend && npm run dev

# Open feedback form
open feedback-form.html

# Analyze results  
./analyze-testing.sh
```

**You're all set! 🚀 Happy testing!**