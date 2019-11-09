create_db:
	python manage.py sqlcreate | sudo -u postgres psql

shell:
	python manage.py shell_plus
