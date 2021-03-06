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

from flask import Flask
import logging

from cmdb.data_storage.database_manager import DatabaseManagerMongo
from cmdb.framework.cmdb_log_manager import CmdbLogManager
from cmdb.framework.cmdb_object_manager import CmdbObjectManager
from cmdb.exportd.exportd_job.exportd_job_manager import ExportdJobManagement
from cmdb.exportd.exportd_logs.exportd_log_manager import ExportdLogManager
from cmdb.user_management import UserManager
from cmdb.utils.security import SecurityManager

LOGGER = logging.getLogger(__name__)


class BaseCmdbApp(Flask):

    def __init__(self, import_name: str,
                 database_manager: DatabaseManagerMongo,
                 exportd_manager: ExportdJobManagement = None,
                 exportd_log_manager: ExportdLogManager = None,
                 object_manager: CmdbObjectManager = None,
                 log_manager: CmdbLogManager = None,
                 user_manager: UserManager = None,
                 security_manager: SecurityManager = None):
        self.database_manager: DatabaseManagerMongo = database_manager
        self.object_manager: CmdbObjectManager = object_manager
        self.exportd_manager: ExportdJobManagement = exportd_manager
        self.exportd_log_manager: ExportdLogManager = exportd_log_manager
        self.log_manager: CmdbLogManager = log_manager
        self.user_manager: UserManager = user_manager
        self.security_manager: SecurityManager = security_manager
        self.temp_folder: str = '/tmp/'
        super(BaseCmdbApp, self).__init__(import_name)
