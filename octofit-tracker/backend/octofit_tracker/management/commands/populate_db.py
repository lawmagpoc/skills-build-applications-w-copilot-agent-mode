from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone
from django.db import connections

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing old data...')
        db_conn = connections['default']
        if db_conn.connection is None:
            db_conn.connect()
        mongo = db_conn.connection
        mongo['users'].delete_many({})
        mongo['teams'].delete_many({})
        mongo['activities'].delete_many({})
        mongo['workouts'].delete_many({})
        mongo['leaderboard'].delete_many({})

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        self.stdout.write('Creating users...')
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
        ]

        self.stdout.write('Creating activities...')
        for user in users:
            Activity.objects.create(user=user, type='Running', duration=30, date=timezone.now().date())
            Activity.objects.create(user=user, type='Cycling', duration=45, date=timezone.now().date())

        self.stdout.write('Creating workouts...')
        Workout.objects.create(name='Hero HIIT', description='High intensity for heroes', suggested_for='Marvel')
        Workout.objects.create(name='Justice Yoga', description='Balance and strength', suggested_for='DC')

        self.stdout.write('Creating leaderboard...')
        Leaderboard.objects.create(team=marvel, points=200)
        Leaderboard.objects.create(team=dc, points=180)

        self.stdout.write('Ensuring unique index on user email...')
        db_conn = connections['default']
        db_conn.connection['users'].create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
