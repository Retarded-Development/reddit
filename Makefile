create_db:
	python manage.py sqlcreate | sudo -u postgres psql

shell:
	python manage.py shell_plus

reset_db:
	python manage.py reset_db

generate_test_data:
	python manage.py migrate 
	python manage.py runscript generate_test_data -v3
