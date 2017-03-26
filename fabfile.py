from fabric.api import env, run, prefix
from fabric.contrib.project import rsync_project

env.roledefs = {
    'production': [''],
    'staging': [''],
}

RSYNC_EXCLUDES = ['local_settings.py', '.git', '*.pyc', 'htmlcov', 'mediafiles', 'server', 'celerybeat-schedule', 'node_modules', '__pycache__']


def server_name():
    return 'dev_webapp' if env['roles'][0] == 'staging' else 'webapp'


def rsync():
    rsync_project(remote_dir='/opt/{0}'.format(server_name()), exclude=RSYNC_EXCLUDES, delete=True)


def install_dependencies():
    with prefix('source /opt/{0}/venv/bin/activate'.format(server_name())):
        run('/opt/{0}/venv/bin/pip install -r /opt/{0}/webapp/requirements.txt -U'.format(server_name()))


def create_virtualenv():
    run('virtualenv --python=python3.5 /opt/{0}/venv'.format(server_name()))


def install():
    create_virtualenv()
    deploy()


def syncdb():
    with prefix('source /opt/{0}/venv/bin/activate'.format(server_name())):
        run('/opt/{0}/venv/bin/python /opt/{0}/webapp/manage.py migrate'.format(server_name()))


def collect_static():
    with prefix('source /opt/{0}/venv/bin/activate'.format(server_name())):
        run('/opt/{0}/venv/bin/python /opt/{0}/webapp/manage.py collectstatic --noinput --settings webapp.settings'.format(server_name()))


def deploy():
    rsync()
    install_dependencies()
    syncdb()
    collect_static()
    run('sudo supervisorctl restart {}'.format(server_name()))
    run('sudo supervisorctl restart {}_celery'.format(server_name()))
    run('sudo supervisorctl restart {}_celery_beat'.format(server_name()))
