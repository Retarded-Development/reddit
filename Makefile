create_db:
	python manage.py sqlcreate | sudo -u postgres psql

shell:
	poetry install
	python manage.py migrate
	python manage.py shell_plus

run:
	poetry install
	python manage.py migrate
	python manage.py runserver 

reset_db:
	python manage.py reset_db

generate_test_data:
	python manage.py migrate 
	python manage.py runscript generate_test_data -v3

show_urls:
	python manage.py show_urls
