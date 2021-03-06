# DATAGERRY - OpenSource Enterprise CMDB
# Copyright (C) 2019 NETHINKS GmbH
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

"""
Query routes for rights system

Warnings:
    Since the rights system is fixed and not variable, protected routes are not necessary.
"""

import logging

from flask import current_app

from cmdb.interface.route_utils import make_response, RootBlueprint, login_required
from cmdb.user_management import UserManager

try:
    from cmdb.utils.error import CMDBError
except ImportError:
    CMDBError = Exception

with current_app.app_context():
    user_manager: UserManager = current_app.user_manager


LOGGER = logging.getLogger(__name__)
right_blueprint = RootBlueprint('right_rest', __name__, url_prefix='/right')


@right_blueprint.route('/', methods=['GET'])
@login_required
def get_all_rights():
    right_list = user_manager.get_all_rights()
    resp = make_response(right_list)
    return resp


@right_blueprint.route('/tree', methods=['GET'])
@login_required
def get_right_tree():
    right_tree = user_manager.get_right_tree()
    resp = make_response(right_tree)
    return resp


@right_blueprint.route('/<string:name>', methods=['GET'])
@login_required
def get_right(name: str):
    right_instance = user_manager.get_right_by_name(name)
    return make_response(right_instance)


@right_blueprint.route('/level/<int:level>', methods=['GET'])
@login_required
def get_rights_with_min_level(level: int):
    right_list = user_manager.get_right_names_with_min_level(level)
    return make_response(right_list)


@right_blueprint.route('/levels', methods=['GET'])
@login_required
def get_security_levels():
    security_levels = user_manager.get_security_levels()
    security_list = []
    for key, value in security_levels.items():
        temp = [key, value]
        security_list.append(temp)
    return make_response(security_list)

# other crud functions are not required because of static right programming
