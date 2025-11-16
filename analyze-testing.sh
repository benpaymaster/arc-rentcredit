#!/bin/bash

# CrossRent Testing Results Analyzer
# Run this after testing sessions to get quick insights

echo "🧪 CrossRent Testing Results Summary"
echo "======================================"
echo ""

# Check if feedback file exists
if [ ! -f "feedback-results.txt" ]; then
    echo "📋 Creating feedback-results.txt for manual data entry..."
    echo "Copy feedback data here for analysis" > feedback-results.txt
fi

echo "📊 Quick Analysis Commands:"
echo ""
echo "1. MOTTO RECALL CHECK:"
echo "   grep -i 'global.*rent' feedback-results.txt | wc -l"
echo ""
echo "2. AVERAGE RATINGS:"
echo "   # Wallet Clarity (look for ratings 8-10)"
echo "   grep -o 'walletClarity.*[8-9]\\|walletClarity.*10' feedback-results.txt | wc -l"
echo ""
echo "   # Trust Level (look for ratings 7-10)" 
echo "   grep -o 'trustLevel.*[7-9]\\|trustLevel.*10' feedback-results.txt | wc -l"
echo ""
echo "3. COMMON ISSUES:"
echo "   grep -i 'confus\\|unclear\\|problem' feedback-results.txt"
echo ""
echo "4. POSITIVE FEEDBACK:"
echo "   grep -i 'good\\|great\\|love\\|easy\\|clear' feedback-results.txt"
echo ""

echo "📈 Success Metrics Checklist:"
echo "□ 80%+ understand wallet requirement immediately"
echo "□ 70%+ recall motto correctly"  
echo "□ Average wallet clarity ≥8/10"
echo "□ Average trust level ≥7/10"
echo "□ No major recurring issues"
echo ""

echo "💡 Quick Testing Tips:"
echo "• Record each session for later review"
echo "• Take notes on exact quotes from users"
echo "• Watch for non-verbal confusion (pausing, squinting)"
echo "• Ask 'What are you thinking?' when they pause"
echo "• Note which users are crypto-experienced vs beginners"
echo ""

echo "🚀 Next Steps After Testing:"
echo "1. Compile all ratings into averages"
echo "2. List top 3 most common issues"
echo "3. Identify any quick fixes needed"
echo "4. Plan iteration priorities"
echo "5. Share positive quotes for team motivation!"
echo ""

echo "📁 Files created:"
echo "• TESTING_GUIDE.md - Complete testing protocol"
echo "• feedback-form.html - User feedback collection"
echo "• feedback-results.txt - Manual data compilation"
echo ""

echo "✅ Ready to test! Good luck! 🎯"