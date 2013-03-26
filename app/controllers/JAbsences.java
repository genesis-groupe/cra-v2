package controllers;

import caches.ResponseCache;
import com.google.common.collect.Lists;
import constants.AbsenceType;
import dto.AbsenceDTO;
import exceptions.AbsenceAlreadyExistException;
import models.JAbsence;
import models.JUser;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.joda.time.DateTimeConstants;
import play.data.Form;
import play.data.validation.ValidationError;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

import static play.libs.Json.toJson;

/**
 * @author f.patin
 */
public class JAbsences extends Controller {

	@BodyParser.Of(BodyParser.Json.class)
	public static Result create() {
		final Form<CreateAbsenceForm> form = Form.form(CreateAbsenceForm.class).bind(request().body().asJson());
		if (form.hasErrors()) {
			return badRequest(form.errorsAsJson());
		}
		final CreateAbsenceForm createAbsenceForm = form.get();
		final JAbsence absence = createAbsenceForm.to();
		try {
			return created(toJson(AbsenceDTO.of(JAbsence.create(absence))));
		} catch (AbsenceAlreadyExistException e) {
			return internalServerError(toJson(e.getMessage()));
		}
	}

	public static Result remove(final String userId, final String id) {
		return ok(toJson(AbsenceDTO.of(JAbsence.delete(userId, id))));
	}

	@ResponseCache.NoCacheResponse
	public static Result history(final String userId, final String absenceType, final Integer year, final Integer month) {
		final List<JAbsence> absences = Lists.newArrayList();
		final AbsenceType at = AbsenceType.of(absenceType);
		if (year == 0) {
			absences.addAll(JAbsence.fetch(userId, at));
		} else {
			if (month == 0) {
				switch (at) {
					case CP:
						absences.addAll(JAbsence.fetch(userId, at, year, DateTimeConstants.JUNE, year + 1, DateTimeConstants.MAY));
						break;
					case RTT:
						absences.addAll(JAbsence.fetch(userId, at, year, DateTimeConstants.JANUARY, year, DateTimeConstants.DECEMBER));
						break;
					default:
						absences.addAll(JAbsence.fetch(userId, at, year, DateTimeConstants.JANUARY, year + 1, DateTimeConstants.MAY));
						break;
				}
			} else {
				absences.addAll(JAbsence.fetch(userId, at, year, month, year, month));
			}
		}
		return ok(toJson(AbsenceDTO.of(absences)));
	}

	public static class CreateAbsenceForm {

		public String username;
		public String missionId;
		public Long startDate;
		public Boolean startMorning;
		public Long endDate;
		public Boolean endAfternoon;
		public String comment;

		public List<ValidationError> validate() {
			return null;
		}

		public JAbsence to() {
			final JAbsence holiday = new JAbsence();
			holiday.userId = JUser.id(this.username);
			holiday.startDate = startMorning ? new DateTime(this.startDate).withTimeAtStartOfDay() : new DateTime(this.startDate).withTime(12, 0, 0, 0);
			holiday.endDate = endAfternoon ? new DateTime(this.endDate).withTime(0,0,0,0).plusDays(1) : new DateTime(this.endDate).withTime(12,0,0,0);
			holiday.missionId = ObjectId.massageToObjectId(this.missionId);
			holiday.comment = this.comment;
			return holiday;
		}
	}
}
