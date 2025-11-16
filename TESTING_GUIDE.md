# 🧪 CrossRent User Testing Guide

## Pre-Testing Setup

### Test Environment
- **URL:** http://localhost:3001
- **Duration:** 15-20 minutes per user
- **Tools:** Screen sharing (Zoom/Meet), recording software
- **Participants:** Mix of crypto-savvy and crypto-newbie users

### Before Each Session
1. Fresh browser session (incognito/private mode)
2. Screen recording started
3. Feedback form ready: https://forms.gle/[YOUR_FORM_LINK]
4. Timer set for session

---

## Phase 1: Unguided Testing (5-7 minutes)

### 📱 **Opening Script**
> "Hi! Thanks for helping test our rent payment app. I'm going to send you a link and I'd love for you to explore it naturally - just think out loud as you look around. Don't worry about completing anything real, just see how far you can get intuitively. I won't give hints unless you're really stuck. Ready?"

### 🔍 **What to Watch For**
- [ ] Do they understand it's a rent payment app immediately?
- [ ] Do they notice the wallet connection requirement?
- [ ] Do they read/mention the animated motto?
- [ ] Do they click "Connect Wallet & Get Started" confidently?
- [ ] Where do they pause or look confused?
- [ ] Do they explore tenant vs landlord options?

### 📝 **Questions to Ask During Exploration**
- "What's your first impression of this page?"
- "What do you think you need to do first?"
- "What stands out to you the most?"
- "Can you read the tagline to me?" (test motto recall)
- "Would you feel comfortable proceeding?"

### ⏰ **Stop Points**
- If they successfully click "Get Started" → Move to Phase 2
- If stuck for >2 minutes → Provide gentle nudge
- At 7 minutes → Move to guided testing

---

## Phase 2: Guided Testing (10-13 minutes)

### 🎯 **Opening Script**
> "Great! Now I'm going to guide you through the full flow so we can test all the features. Feel free to share your thoughts on anything as we go."

### 🔄 **Complete Flow Test**
1. **Wallet Connection**
   - Guide them to click "Connect Wallet & Get Started"
   - Watch their reaction to wallet creation screen
   - Note any confusion about crypto/USDC

2. **Payment Form**
   - Have them fill out realistic data:
     - Address: "123 Test Street, City, State"
     - Amount: "$2000"
     - Duration: "12 months"
   - Watch for any form usability issues

3. **Success Screen**
   - Note their reaction to completion
   - Ask about the motto recall here

4. **Dashboard Features**
   - Show landlord view
   - Demonstrate "View All Properties"
   - Show payment history

### 💬 **Key Questions During Flow**
- "How do you feel about creating a crypto wallet?"
- "Is the payment process clear to you?"
- "Would you trust this for real rent payments? Why/why not?"
- "What's missing that you'd expect to see?"
- "Rate the overall experience 1-10"

---

## Post-Testing Quick Survey

### 📋 **Essential Questions** (2-3 minutes)
1. **Motto Recall:** "Can you remember the main tagline/motto from the app?"
2. **Clarity:** "Was it clear you needed a crypto wallet? (1-10)"
3. **Trust:** "Would you use this for real rent payments? (1-10)"
4. **Confusion:** "What was most confusing or unclear?"
5. **Missing Features:** "What would you add or change?"
6. **Crypto Experience:** "Rate your crypto knowledge: Beginner/Intermediate/Advanced"
7. **Overall Rating:** "Rate the overall experience (1-10)"

---

## Testing Session Notes Template

```
Session #: ___
Date/Time: ___
Participant: ___ (Crypto Level: Beginner/Intermediate/Advanced)

PHASE 1 NOTES:
□ Understood rent payment purpose immediately
□ Noticed wallet requirement without prompting
□ Mentioned/read the motto
□ Clicked "Get Started" confidently
□ Explored tenant/landlord options

Confusion Points:
- 
- 

Quotes:
- 
- 

PHASE 2 NOTES:
□ Wallet creation went smoothly
□ Payment form was intuitive
□ Positive reaction to success screen
□ Understood landlord features

Issues Found:
- 
- 

RATINGS:
Wallet Clarity: ___/10
Trust Level: ___/10
Overall Experience: ___/10

MOTTO RECALL: ___

KEY INSIGHTS:
- 
- 
```

---

## Success Metrics

### 🎯 **Target Goals**
- **≥80%** understand wallet requirement immediately
- **≥70%** recall motto after testing
- **≥8/10** average clarity rating
- **≥7/10** average trust rating
- **≥90%** complete unguided flow to "Get Started"

### 🚨 **Red Flags**
- Users repeatedly miss wallet requirement
- Multiple users get stuck at same point
- Trust ratings consistently <6/10
- Motto recall <50%

---

## Quick Parallel Testing Setup

### 📅 **Schedule Template**
```
3:00 PM - User 1 (Unguided focus)
3:30 PM - User 2 (Guided focus)  
4:00 PM - User 3 (Unguided focus)
4:30 PM - User 4 (Guided focus)
5:00 PM - User 5 (Mixed crypto experience)
5:30 PM - User 6 (Complete beginner)
```

### 🔄 **Between Sessions** (5 minutes)
- [ ] Save/export feedback
- [ ] Reset browser (clear cache/cookies)
- [ ] Quick notes review
- [ ] Prep next participant

---

## Emergency Troubleshooting

### If App Crashes
1. Check http://localhost:3001 status
2. Restart dev server: `npm run dev`
3. Use backup deployment link (if available)

### If User Gets Completely Lost
> "No worries! Let me guide you to the main action. See the green 'Connect Wallet & Get Started' button? That's the first step for paying rent."

---

## Post-Testing Analysis

### 📊 **Immediate Review** (30 minutes after testing)
1. Compile all ratings and quotes
2. Identify top 3 issues
3. Note any immediate fixes needed
4. Plan iteration priorities

### 📈 **Success Indicators**
- Consistent positive feedback
- Clear understanding of wallet requirement
- High trust ratings
- Strong motto recall
- Smooth unguided navigation

**Good luck with testing! This should give you solid, actionable feedback quickly! 🚀**