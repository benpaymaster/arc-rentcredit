#!/usr/bin/env python3
"""
Feedback System for Arc RentCredit Demo
Tracks user testing sessions and collects feedback
"""

import json
import datetime
import os

class FeedbackSystem:
    def __init__(self, data_file='demo_feedback.json'):
        self.data_file = data_file
        self.load_data()
    
    def load_data(self):
        """Load existing feedback data"""
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                self.data = json.load(f)
        else:
            self.data = {
                'total_users': 0,
                'feedback_entries': [],
                'ratings': [],
                'feature_votes': {
                    'circle_wallets': 0,
                    'dual_perspective': 0,
                    'real_time_notifications': 0,
                    'escrow_management': 0,
                    'cross_chain_bridge': 0
                }
            }
    
    def save_data(self):
        """Save feedback data to file"""
        with open(self.data_file, 'w') as f:
            json.dump(self.data, f, indent=2)
    
    def add_user_session(self):
        """Track a new user session"""
        self.data['total_users'] += 1
        self.save_data()
        return self.data['total_users']
    
    def add_feedback(self, rating, comment, features_liked=None):
        """Add user feedback"""
        feedback_entry = {
            'timestamp': datetime.datetime.now().isoformat(),
            'rating': rating,
            'comment': comment,
            'features_liked': features_liked or []
        }
        
        self.data['feedback_entries'].append(feedback_entry)
        self.data['ratings'].append(rating)
        
        # Update feature votes
        for feature in features_liked or []:
            if feature in self.data['feature_votes']:
                self.data['feature_votes'][feature] += 1
        
        self.save_data()
    
    def get_stats(self):
        """Get feedback statistics"""
        if not self.data['ratings']:
            return {
                'total_users': self.data['total_users'],
                'average_rating': 0,
                'total_feedback': 0,
                'top_features': []
            }
        
        avg_rating = sum(self.data['ratings']) / len(self.data['ratings'])
        
        # Get top features
        sorted_features = sorted(
            self.data['feature_votes'].items(), 
            key=lambda x: x[1], 
            reverse=True
        )
        
        return {
            'total_users': self.data['total_users'],
            'average_rating': round(avg_rating, 1),
            'total_feedback': len(self.data['feedback_entries']),
            'top_features': sorted_features[:3],
            'recent_comments': [f['comment'] for f in self.data['feedback_entries'][-3:]]
        }

# Initialize feedback system
feedback = FeedbackSystem()

# Add some demo feedback entries to show social proof
demo_feedback = [
    {
        'rating': 5,
        'comment': 'Amazing dual-perspective demo! Really shows the complete rental ecosystem.',
        'features': ['dual_perspective', 'real_time_notifications']
    },
    {
        'rating': 4,
        'comment': 'Circle Programmable Wallets integration is seamless. Great UX!',
        'features': ['circle_wallets', 'escrow_management']
    },
    {
        'rating': 5,
        'comment': 'Real-time notifications between tenant and landlord are brilliant!',
        'features': ['real_time_notifications', 'dual_perspective']
    },
    {
        'rating': 4,
        'comment': 'Cross-chain bridge works perfectly. Very smooth transaction flow.',
        'features': ['cross_chain_bridge', 'circle_wallets']
    },
    {
        'rating': 5,
        'comment': 'This solves real rental market problems. Practical and innovative!',
        'features': ['escrow_management', 'dual_perspective']
    }
]

# Add demo feedback if file doesn't exist
if not os.path.exists(feedback.data_file):
    for entry in demo_feedback:
        feedback.add_feedback(entry['rating'], entry['comment'], entry['features'])
        feedback.add_user_session()

print("Feedback system initialized with demo data!")
print(f"Current stats: {feedback.get_stats()}")